import traceback

from model.user import User
from app import db


class UserDao(object):

	@staticmethod
	def get_user_by_username(username: str) -> User:
		try:
			session = db.session()
			user = session.query(User).filter(User.username == username).first()
			return user
		except :
			print("read user error!")
			traceback.print_exc()
		finally:
			session.close()

	@staticmethod
	def insert_user(username: str, password: str):
		try:
			session = db.session
			user = User(username, password)
			session.add(user)
			session.commit()
		except:
			print("insert user error!")
			traceback.print_exc()
		finally:
			session.close()



