from flask_restplus import Resource, fields, Namespace
from flask import request
from werkzeug.utils import secure_filename
from multiprocessing.pool import ThreadPool
import os

from factory.servicefactory import project_service
from service.analyzer import RulesAnalyzer

ns = Namespace("project", description = "关于项目管理")

project_standard = ns.model("单个项目的格式", {
	"projectId": fields.Integer(description = "项目唯一编号", required = True),
	"projectName": fields.String(description = "项目名称"),
	"projectDescription": fields.String(description = "项目描述"),
	"isFinished": fields.Integer(description = "项目状态0或1")
})

project_lists_model = ns.model("项目列表", {
	"projects": fields.List(fields.Nested(project_standard))
})

creation_model = ns.model("创建项目返回值", {
	"result": fields.String(description = "成功与否"),
	"projectId": fields.Integer(description = "项目编号", default = -1)
})

pl_arg_parser = ns.parser()
pl_arg_parser.add_argument('username', type = str, help = '用户名', location = 'args')

'''
不要用ns.param, 那个参数会解析放在url的/里面，不是query里面
要在namespace中声明
'''


@ns.route("/list")
class ProjectList(Resource):

	@ns.doc("拉取项目列表")
	@ns.expect(pl_arg_parser)
	@ns.response(200, "正常返回", project_lists_model)
	def get(self):
		args = pl_arg_parser.parse_args()
		username = args['username']

		pl = project_service.get_project_lists(username)
		res = []
		for item in pl:
			res.append(item.serialize())
		return {"projects": res}, 200


@ns.route("/new")
class ProjectCreation(Resource):

	@ns.doc("创建新项目，不含文件")
	@ns.response(200, "访问服务成功", creation_model)
	def post(self):
		project_info = ns.payload["project"]
		username = ns.payload["username"]

		res = project_service.create_new_project_for_user(username, project_info)
		return res


'''
Another solution for file upload
reference: https://flask-restplus.readthedocs.io/en/stable/parsing.html

upload_parser = ns.parser()
upload_parser.add_argument('file', location='files',
                            type=FileStorage, required=True)

@ns.expect(upload_parser)
	def post(self)
		uploaded_file = args['file'] 
'''

BASE_DIR_PATH = ".\\assets"

upload_response = ns.model("上传响应信息", {
	'result': fields.Boolean(description = "是否上传成功"),
	'message': fields.String(description = "提示信息", default = "")
})


@ns.route("/upload")
class UploadFiles(Resource):

	@ns.doc("上传文件")
	@ns.response(200, "服务器有应答", upload_response)
	def post(self):
		uploaded_file = request.files['files[]']
		project_id = request.form['projectId']
		username = request.form['username']

		if uploaded_file:
			filename = secure_filename(uploaded_file.filename)
			concat_file_name = project_id + "-" + username + "-" + filename
			concat_path_name = os.path.join(BASE_DIR_PATH, concat_file_name)

			uploaded_file.save(concat_path_name)

			# 调用解压文件的方法
			extracted_file_path_name = project_service.extracted_upload_files(BASE_DIR_PATH, concat_file_name)
			# print(extracted_file_path_name, " and ", type(extracted_file_path_name))

			# 解压失败
			if extracted_file_path_name == "":
				return {"result": "failed",
				        "message": "file extracted failed"}, 200
			# 解压成功，将项目同解压后的文件关联
			else:
				project_service.associated_upload_files_with_project(project_id, extracted_file_path_name)

				# start the analyze process
				pool = ThreadPool(processes = 1)
				pool.apply_async(RulesAnalyzer().start_evolutionary_analysis(extracted_file_path_name))

				return {"result": "success"}, 200

		return {"result": "failed",
		        "message": "file upload failed"}, 200