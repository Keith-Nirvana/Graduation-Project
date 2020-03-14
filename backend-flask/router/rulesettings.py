from flask_restplus import Resource, fields, Namespace
from factory.servicefactory import rule_service

ns = Namespace("settings", description = "关于法则配置")

rs_arg_parser = ns.parser()
rs_arg_parser.add_argument('username', type = str, help = '用户名', location = 'args')

rules_settings_model = ns.model("法则配置的格式", {
	"fileChanges": fields.Boolean(description="文件变化（增删改）"),
	"mcc": fields.Boolean(description="圈复杂度"),
	"fileNumber": fields.Boolean(description="文件数量"),
	"functionNumber": fields.Boolean(description="函数数量"),
	"fileChangeRate": fields.Boolean(description="文件变化率"),
	"functionChangeRate": fields.Boolean(description="函数变化率"),
	"loc": fields.Boolean(description="代码行数"),
	"commentRate": fields.Boolean(description="注释比例"),
	"tarskiModel": fields.Boolean(description="tarski模型"),
})

request_model = ns.model("请求格式", {
	"username": fields.String(description="用户名"),
	"settings": fields.Nested(model=rules_settings_model)
})


@ns.route("/rules")
class RulesSettings(Resource):

	@ns.doc("法则获取")
	@ns.expect(rs_arg_parser)
	@ns.response(200, "获取法则成功")
	def get(self):
		args = rs_arg_parser.parse_args()
		username = args['username']

		res = rule_service.search_rule_base(username)
		if res is not None:
			return {"rules": res.serialize()}, 200
		else:
			return {}, 404

	@ns.doc("设置法则")
	@ns.response(200, "设置法则成功")
	def post(self):
		username = ns.payload['username']
		settings = ns.payload['settings']

		rule_service.update_rules_by_user(username, settings)
		return 200
