from app import db


class Setting(db.Model):
	id = db.Column(db.Integer, primary_key = True, autoincrement = True)
	fileChanges = db.Column(db.Boolean)
	mcc = db.Column(db.Boolean)
	fileNumber = db.Column(db.Boolean)
	functionNumber = db.Column(db.Boolean)
	fileChangeRate = db.Column(db.Boolean)
	functionChangeRate = db.Column(db.Boolean)
	loc = db.Column(db.Boolean)
	commentRate = db.Column(db.Boolean)
	tarskiModel = db.Column(db.Boolean)
	settingsOwner = db.Column(db.String(50), db.ForeignKey("user.id"))

	def __init__(self, fileChanges, mcc, fileNumber, functionNumber, fileChangeRate, functionChangeRate,
	             loc, commentRate, tarskiModel, settingsOwner):
		self.fileChanges = fileChanges
		self.mcc = mcc
		self.fileNumber = fileNumber
		self.functionNumber = functionNumber
		self.fileChangeRate = fileChangeRate
		self.functionChangeRate = functionChangeRate
		self.loc = loc
		self.commentRate = commentRate
		self.tarskiModel = tarskiModel
		self.settingsOwner = settingsOwner

	def serialize(self):
		return {"id": self.id,
		        "fileChanges": self.fileChanges,
		        "mcc": self.mcc,
		        "fileNumber": self.fileNumber,
		        "functionNumber": self.functionNumber,
		        "fileChangeRate": self.fileChangeRate,
		        "functionChangeRate": self.functionChangeRate,
		        "loc": self.loc,
		        "commentRate": self.commentRate,
		        "tarskiModel": self.tarskiModel,
		        "settingsOwner": self.settingsOwner
		        }
