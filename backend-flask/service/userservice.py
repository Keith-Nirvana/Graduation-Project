from factory import daofactory


class UserService(object):
	def __init__(self):
		self.user_dao = daofactory.user_dao

	def login_validate(self, username: str, password: str):
		user = self.user_dao.get_user_by_username(username)
		if user is None:
			return {'result': False,
			        'message': "User not exist"}
		elif user is not None and user.password == password:
			return {'result': True }
		else:
			return {'result': False,
			        'message': "Wrong password"}


	def register(self, username: str, password: str):
		# 先check是否有重复名字
		user = self.user_dao.get_user_by_username(username);
		if user is not None:
			return {
				"result": False,
				"message": "User exists"
			}
		self.user_dao.insert_user(username, password)
		return {
			"result": True
		}