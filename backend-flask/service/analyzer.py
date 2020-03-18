import os
import hashlib
import lizard
# from factory.daofactory import project_dao
# from factory.daofactory import rule_dao

EXT_LIMITATION = [".py", ".cpp", ".c", ".h"]

class RulesAnalyzer(object):
	def __init__(self):
		self.metric_dict = {}
		self.version_count = -1
		self.current_root_dir = ""

	def start_evolutionary_analysis(self, project_base_path):
		print("Start an evolutionary analysis. Current dir is: " + project_base_path)

		# 项目路径不存在，结束任务
		if not os.path.exists(project_base_path):
			print("No such project folder. Evolution analysis turns down")
			return

		self.current_root_dir = project_base_path
		self.version_count = self.get_version_count()
		self.initialize_metric_dict()

		# 分解文件夹名
		folder_name = os.path.split(project_base_path)[1].split('-')
		project_Id = folder_name[0]
		username = folder_name[1]
		rule_settings = self.get_rule_settings(username)

		# 没有需要验证的指标
		if self.is_no_rule_needed(rule_settings):
			print("No rules needs to be validated. Evolution analysis stop")
			return

		# file changes 计算
		if rule_settings.get("fileChanges"):
			for i in range(self.version_count - 1):
				path_a = os.path.join(project_base_path, str(i+1))
				path_b = os.path.join(project_base_path, str(i+2))
				diff_result = self.dir_compare(path_a, path_b)
				self.metric_dict[str(i+1)] = diff_result

		for i in range(self.version_count):
			root_path = os.path.join(project_base_path, str(i + 1))
			analysis_result = self.complex_analyze(root_path)
			self.metric_dict[str(i + 1)] = analysis_result

		# dir_or_files = os.listdir(project_base_path)
		# for dir_file in dir_or_files:
		# 	# 获取目录或者文件的路径
		# 	dir_file_path = os.path.join(project_base_path, dir_file)
		# 	print(dir_file_path)
		print("projectId:  " + project_Id + ", username: " + username)

		# todo
		# project_dao.update_project_status(project_Id, username)

	def complex_analyze(self, root_path):
		res = {"mcc": 0.0, "fileNumber": 0, "functionNumber": 0, "loc": 0}




		return res

	def get_version_count(self):
		return os.listdir(self.current_root_dir).__len__()

	def initialize_metric_dict(self):
		for i in range(self.version_count):
			self.metric_dict[str(i+1)] = {}

	def get_rule_settings(self, username: str) ->dict:
		# todo
		# rule_dao.get_rules_settings_by_user(username) # pack成一个list
		return {
			"fileChanges": False,
			"mcc": True,
			"fileNumber": True,
			"functionNumber": True,
			"fileChangeRate": True,
			"functionChangeRate": True,
			"loc": True,
			"commentRate": True,
			"tarskiModel": True,
		}

	def is_no_rule_needed(self, rule_settings_to_test: dict) -> bool:
		for key, values in rule_settings_to_test.items():
			if values:
				return False
		return True

	def dir_compare(self, path_a, path_b):
		res = {"fileChanges": {"added": 0, "deleted": 0, "modified": 0}}

		path_a, a_files = self.get_all_files(path_a)
		path_b, b_files = self.get_all_files(path_b)

		set_a = set(a_files)
		set_b = set(b_files)

		shared_files = set_a & set_b  # 处理共有文件

		for f in sorted(shared_files):
			md5_file_in_a = self.get_file_md5(path_a + '\\' + f)
			md5_file_in_b = self.get_file_md5(path_b + '\\' + f)
			if md5_file_in_a != md5_file_in_b:
				res["fileChanges"]["modified"] += 1

		# 处理仅出现在一个目录中的文件
		separate_files = set_a ^ set_b
		for sf in separate_files:
			if sf in a_files:
				res["fileChanges"]["deleted"] += 1
			elif sf in b_files:
				res["fileChanges"]["added"] += 1

		return res

	def get_file_md5(self, file_path):
		if not os.path.exists(file_path):
			print("No such file. Cannot calculate the md5 value")
			return

		hash_val = hashlib.md5()

		with open(file_path, 'rb') as f:
			while True:
				bytes_block = f.read(8096)

				if not bytes_block:
					break

				hash_val.update(bytes_block)

		return hash_val.hexdigest()

	def get_all_files(self, root_path):
		file_list = []

		# 用户以序号封装项目。需获取项目的真实根路径
		true_root_path = root_path
		while os.listdir(true_root_path).__len__() == 1 and os.path.isdir(os.path.join(true_root_path, os.listdir(true_root_path)[0])):
			true_root_path = os.path.join(true_root_path, os.listdir(true_root_path)[0])

		# 将需比较的文件加入列表（由文件后缀决定）
		for root, dirs, files in os.walk(true_root_path):
			for file in files:
				if os.path.splitext(file)[1] in EXT_LIMITATION:
					file_full_path = os.path.join(root, file)
					file_relative_path = file_full_path[len(true_root_path):]
					file_list.append(file_relative_path)

		# print(true_root_path, file_list.__len__())
		return true_root_path, file_list


# 主体分析逻辑测试
if __name__ == '__main__':
	ra = RulesAnalyzer()
	ra.start_evolutionary_analysis(r"..\assets\4-cao-test_data")
	print(ra.metric_dict)

	# 1
	# RulesAnalyzer().get_all_files(r"..\assets\4-cao-test_data\4")

	# 2
	# res1 = RulesAnalyzer().get_file_md5(r"..\assets\4-cao-test_data\1\test.cpp")
	# res2 = RulesAnalyzer().get_file_md5(r"..\assets\4-cao-test_data\2\test.cpp")
	# print(res1 == res2)

	# 3
	# os.chdir(r"..\assets\4-cao-test_data")
	# res = lizard.analyze_file(r".\1\bitcoin-0.1.5\main.cpp")
	# print(type(res))
	# print(res.__dict__)
	# # print(my_list)
	# print("finished")

	# 4
	# rules_analyzer = RulesAnalyzer()
	# res = rules_analyzer.dir_compare(r"..\assets\4-cao-test_data\3", r"..\assets\4-cao-test_data\4")
	# print(res)

