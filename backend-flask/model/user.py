from app import db

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	username = db.Column(db.String(50))
	password = db.Column(db.String(50))

	def __init__(self, username, password):
		self.username = username
		self.password = password