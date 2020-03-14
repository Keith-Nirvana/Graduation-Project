from app import db

class Project(db.Model):
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	projectName = db.Column(db.String(50))
	projectDescription = db.Column(db.String(200))
	versionCount = db.Column(db.Integer)
	status = db.Column(db.Integer, default = 0)
	projectLoc = db.Column(db.String(60))
	projectOwner = db.Column(db.String(50), db.ForeignKey("user.id"))

	def __init__(self, projectName, projectDescription, versionCount, projectOwner):
		self.projectName = projectName
		self.projectDescription = projectDescription
		self.versionCount = versionCount
		self.projectOwner = projectOwner
		self.status = 0
		self.projectLoc = ""

	def serialize(self):
		return {"id": self.id,
		        "projectName": self.projectName,
		        "projectDescription": self.projectDescription,
		        "status": self.status,
		        "projectLoc": self.projectLoc,
		        "projectOwner": self.projectOwner}
