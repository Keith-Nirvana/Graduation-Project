from flask_restplus import Resource, fields, Namespace

from factory.servicefactory import user_service
from factory.servicefactory import rule_service

ns = Namespace("user", description='关于用户数据')

login_arg_parser = ns.parser()
login_arg_parser.add_argument('username', type=str, help='用户名', location='args')
login_arg_parser.add_argument('password', type=str, help='密码', location='args')


login_response = ns.model("登录响应信息", {
    'result': fields.Boolean(description="此用户是否已经验证"),
	'message': fields.String(description="提示信息", default="")
})

@ns.route('/login')
class LoginApi(Resource):

	@ns.doc("登录")
	@ns.expect(login_arg_parser)
	@ns.response(200, "登录成功", login_response)
	@ns.response(401, "用户密码无效")
	def get(self):
		args = login_arg_parser.parse_args()
		username = args['username']
		password = args['password']
		print(username, password)

		res = user_service.login_validate(username, password)
		if res['result']:
			return res, 200
		else:
			return res, 401

	@ns.doc("注册")
	@ns.response(200, "注册成功", login_response)
	@ns.response(409, "用户已存在")
	def post(self):
		username = ns.payload['username']
		password = ns.payload['password']
		print(username, password)

		res = user_service.register(username, password)
		rule_service.add_basic_rules_setting_for_user(username)
		if res['result']:
			return res, 200
		else:
			return res, 409