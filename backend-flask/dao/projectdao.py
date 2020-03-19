import traceback

from sqlalchemy import or_, and_

from model.user import User
from model.project import Project
from app import db

class ProjectDao(object):

	@staticmethod
	def get_all_projects_by_user(username: str):
		try:
			session = db.session
			result = session.query(Project).filter_by(projectOwner = username).all()
			return result
		except:
			print("Get project lists error")
			traceback.print_exc()
		finally:
			session.close()

	@staticmethod
	def get_exact_project_by_name_and_user(project_name: str, username: str):
		try:
			session = db.session
			result = session.query(Project).filter(and_(Project.projectName == project_name,
			                                           Project.projectOwner == username)).first()
			return result
		except:
			print("Get exact project error 1")
			traceback.print_exc()
		finally:
			session.close()

	@staticmethod
	def get_exact_project_by_id(project_id):
		try:
			session = db.session
			result = session.query(Project).filter(Project.id == project_id).first()
			return result
		except:
			print("Get exact project error 2")
			traceback.print_exc()
		finally:
			session.close()

	@staticmethod
	def insert_new_project_for_user(username: str, payload: dict):
		checker = ProjectDao.get_exact_project_by_name_and_user(payload["projectName"], username)
		if checker is not None:
			return None

		try:
			session = db.session
			project = Project(
				payload["projectName"],
				payload["projectDescription"],
				payload["versionCount"],
				username
			)

			session.add(project)
			session.commit()

			return ProjectDao.get_exact_project_by_name_and_user(payload["projectName"], username)
		except:
			print("Create new project error")
			traceback.print_exc()
		finally:
			session.close()

	@staticmethod
	def update_project_path_info(projectId: int, path: str):
		try:
			session = db.session
			target_project = session.query(Project).filter(Project.id == projectId).first()

			if target_project is not None:
				target_project.projectLoc = path

			session.commit()
		except:
			print("Update project error")
			traceback.print_exc()
		finally:
			session.close()

	@staticmethod
	def update_project_status(projectId: int, username: str):
		try:
			session = db.session
			to_update_project = session.query(Project).filter(and_(Project.id == projectId,
			                                                       Project.projectOwner == username)).first()

			if to_update_project is not None:
				to_update_project.status = 1

			session.commit()
		except:
			print("Update project status error!")
			traceback.print_exc()
		finally:
			session.close()

	@staticmethod
	def delete_project_by_id(projectId: int):
		try:
			session = db.session

			project = session.query(Project).get(projectId)
			session.delete(project)

			session.commit()
		except:
			print("Delete project error")
			traceback.print_exc()
		finally:
			session.close()