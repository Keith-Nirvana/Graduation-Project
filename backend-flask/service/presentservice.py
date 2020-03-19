import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.ticker import MultipleLocator
import os

from factory.servicefactory import project_service
from factory.servicefactory import rule_service

BASE_PATH = r"./model/image_result"
# include download interface, draw picture interface
# maybe will add calculate hypothesis
class PresentService(object):

	def __init__(self):
		self.analysis_file_path = ""
		self.project_name = ""
		self.project_Id = 0
		self.username = ""

	def draw_plots_for_project(self, analysis_file_path, project_Id, username):
		print("read csv file from", analysis_file_path)
		self.analysis_file_path = analysis_file_path
		self.project_Id = project_Id
		self.username = username

		self.project_name = project_service.get_single_project(project_Id)

		rule_settings = rule_service.get_rule_settings_for_analyse(username)

		os.mkdir(os.path.join(BASE_PATH, str(self.project_Id) + "-" + self.username))
		for key, value in rule_settings.items():
			if value:
				if key == "fileChanges":
					order_no, added_data, modified_data, deleted_data = self.get_file_changes_metric()
					self.draw_file_changes_plot(order_no, added_data, modified_data, deleted_data)
				else:
					order_no, data = self.get_single_metric(key)
					self.draw_plot(order_no, data, key)

	def get_single_metric(self, metric):
		df = pd.read_csv(self.analysis_file_path)
		order_no = []
		data = []
		# index = 0
		for i in range(df[metric].__len__()):
			order_no.append(df['no'][i])
			data.append(df[metric][i])
		return order_no, data

	def draw_plot(self, order_no, data, metric):
		figure, ax = plt.subplots(figsize = (10, 6))

		ax.xaxis.set_major_locator(MultipleLocator(5))

		# 文字
		for label in ax.xaxis.get_ticklabels():
			# label is a Text instance
			label.set_rotation(45)
			label.set_fontsize(16)

		# 文字
		for label in ax.yaxis.get_ticklabels():
			# label is a Text instance
			label.set_fontsize(16)

		ax.plot(order_no, data, 'b', label = self.project_name + ' ' + metric, lw = 1.5)

		# 设置网格形式
		plt.grid(False)
		# 设置图例显示位置
		plt.legend(loc = "upper left", fontsize = 18)

		plt.tight_layout()

		folder_name = str(self.project_Id) + "-" + self.username
		plt.savefig(os.path.join(BASE_PATH, folder_name, metric + self.project_name + '.png'))
		plt.show()

	def get_file_changes_metric(self):
		df = pd.read_csv(self.analysis_file_path)
		order_no = []
		added_data = []
		modified_data = []
		deleted_data = []

		# index = 0
		for i in range(df["fileAdded"].__len__()):
			order_no.append(df['no'][i])

			added_data.append(df["fileAdded"][i])
			modified_data.append(df["fileModified"][i])
			deleted_data.append(df["fileDeleted"][i])

		return order_no, added_data, modified_data, deleted_data

	def draw_file_changes_plot(self, order_no, added_data, modified_data, deleted_data):
		figure, ax = plt.subplots(figsize = (10, 6))

		ax.xaxis.set_major_locator(MultipleLocator(5))

		# 文字
		for label in ax.xaxis.get_ticklabels():
			# label is a Text instance
			label.set_rotation(45)
			label.set_fontsize(16)

		# 文字
		for label in ax.yaxis.get_ticklabels():
			# label is a Text instance
			label.set_fontsize(16)

		ax.plot(order_no, added_data, 'r', label = self.project_name  + ' add file ', lw = 1.5)  # plt.plot(x,y)，这个将数据画成曲线
		ax.plot(order_no, modified_data, 'g', label = self.project_name + ' modify file ', lw = 1.5)  # plt.plot(x,y)，这个将数据画成曲线
		ax.plot(order_no, deleted_data, 'b', label = self.project_name + ' delete file ', lw = 1.5)  # plt.plot(x,y)，这个将数据画成曲线

		# 设置网格形式
		plt.grid(False)
		# 设置图例显示位置
		plt.legend(loc = "upper left", fontsize = 18)

		plt.tight_layout()

		folder_name = str(self.project_Id) + "-" + self.username
		plt.savefig(os.path.join(BASE_PATH, folder_name, "fileChanges" + self.project_name + '.png'))
		plt.show()

	# def get_rule_settings(self, username: str) ->dict:
	#
	# 	# rule_dao.get_rules_settings_by_user(username) # pack成一个list
	# 	return {
	# 		"fileChanges": True,
	# 		"mcc": True,
	# 		"fileNumber": False,
	# 		"functionNumber": True,
	# 		"fileChangeRate": True,
	# 		"functionChangeRate": True,
	# 		"loc": False,
	# 		"commentRate": True,
	# 		"tarskiModel": False,
	# 	}


if __name__ == '__main__':
	PresentService().draw_plots_for_project(r"../model/csv_result/4-cao-test_data-analysis.csv", 4, "cao")