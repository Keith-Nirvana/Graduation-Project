from factory import daofactory
import zipfile
import traceback
import os
import shutil

class ProjectService(object):
	def __init__(self):
		self.project_dao = daofactory.project_dao
		self.user_dao = daofactory.user_dao

	def get_project_lists(self, username: str):
		return self.project_dao.get_all_projects_by_user(username)

	def create_new_project_for_user(self, username, project_info):
		# 如果用户根本不存在
		if self.user_dao.get_user_by_username(username) is None:
			return {"result": "failed"}

		res =  self.project_dao.insert_new_project_for_user(username, project_info)
		if res is None:
			return {"result": "failed"}
		return {"result": "success",
		        "projectId": res.id}

	def associated_upload_files_with_project(self, projectId: int, project_path):
		self.project_dao.update_project_path_info(projectId, project_path)


	def extracted_upload_files(self, base_path: str, filename: str):
		zf = zipfile.ZipFile(os.path.join(base_path, filename))

		dir_name = os.path.splitext(filename)[0]
		dest_dir = os.path.join(base_path, dir_name)
		os.mkdir(dest_dir)

		try:
			zf.extractall(path = dest_dir)
		except RuntimeError as e:
			print(e);   return ""
		finally:
			zf.close()

		os.remove(os.path.join(base_path, filename))
		return dest_dir


	def validate_uploaded_files(self, project_path):
		dirs_and_files = os.listdir(project_path)
		version_count = dirs_and_files.__len__()

		for i in range(version_count):
			if str(i+1) not in dirs_and_files:
				return False

		for item in dirs_and_files:
			item_full_path = os.path.join(project_path, item)

			if not os.path.isdir(item_full_path):
				return False

		return True

	def rollback_project(self, project_path, project_id):
		if os.path.exists(project_path):
			shutil.rmtree(project_path)

		self.project_dao.delete_project_by_id(project_id)

