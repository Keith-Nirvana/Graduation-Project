from app import db

class AnalysisItem(db.Model):
	id = db.Column(db.Integer, primary_key = True, autoincrement = True)
	projectId = db.Column(db.Integer, db.ForeignKey("project.id"))
	urlLink = db.Column(db.String(200))

	slope = db.Column(db.Float)
	estimator = db.Column(db.Float)
	
	rSquare = db.Column(db.Float)
	ssr = db.Column(db.Float)
	sse = db.Column(db.Float)
	fVal = db.Column(db.Float)
	pf = db.Column(db.Float)
	tVal = db.Column(db.Float)
	pt = db.Column(db.Float)

	conclusion = db.Column(db.Boolean)

	def __init__(self, projectId, urlLink, slope, estimator, rSquare, ssr, sse, fVal, pf, tVal, pt, conclusion):
		self.projectId = projectId; self.urlLink = urlLink
		self.slope = slope; self.estimator = estimator
		self.rSquare = rSquare; self.ssr = ssr; self.sse = sse; self.fVal = fVal; self.pf = pf; self.tVal = tVal; self.pt = pt
		self.conclusion = conclusion

	def serialize(self):
		return {"id": self.id,
		        "projectId": self.projectId,
		        "urlLink": self.urlLink,
		        "slope": self.slope,
		        "rSquare": self.rSquare,
		        "pt": self.pt,
		        "conclusion": self.conclusion}