import os
from factory.daofactory import project_dao

class RulesAnalyzer(object):

	@staticmethod
	def start_evolutionary_analysis(project_base_path):
		print(project_base_path)

		# 项目路径不存在，结束任务
		if not os.path.exists(project_base_path):
			print("No such project folder")
			return

		folder_name = os.path.split(project_base_path)
		name_eles = folder_name.split('-')
		project_Id = name_eles[0]
		username = name_eles[1]

		project_dao.update_project_status(project_Id, username)


