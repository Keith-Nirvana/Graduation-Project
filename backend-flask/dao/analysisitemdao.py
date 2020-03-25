import traceback
from sqlalchemy import or_, and_

from model.analysisitem import AnalysisItem
from app import db

class AnalysisItemDao(object):

	@staticmethod
	def insert_new_item(project_id, url_link, testing_result, metric):
		try:
			session = db.session
			analysis_item = AnalysisItem(project_id, url_link, testing_result[0], testing_result[1],
			                             testing_result[2], testing_result[3], testing_result[4], testing_result[5], testing_result[6], testing_result[7], testing_result[8],
			                             True)
			session.add(analysis_item)
			session.commit()
		except:
			print("Encounter error when inserting new analysis item")
			traceback.print_exc()


	@staticmethod
	def get_result_for_single_project(project_id):
		try:
			session = db.session
			result = session.query(AnalysisItem).filter_by(projectId = project_id).all()
			return result
		except:
			print("Get testing result and pictures for single project error")
			traceback.print_exc()
		finally:
			session.close()