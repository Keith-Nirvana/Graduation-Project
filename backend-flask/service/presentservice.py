import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from scipy import stats

import matplotlib.pyplot as plt
from matplotlib.ticker import MultipleLocator
import os

from factory.servicefactory import project_service
from factory.servicefactory import rule_service
from factory.daofactory import analysis_item_dao
from util.oss import ObjectStorageService

BASE_PATH = r"./model/image_result"
# include download interface, draw picture interface
class PresentService(object):

	def __init__(self):
		self.analysis_file_path = ""
		self.project_name = ""
		self.project_Id = 0
		self.username = ""

	def test_and_draw_plots_for_project(self, analysis_file_path, project_Id, username):
		print("read csv file from", analysis_file_path)
		self.analysis_file_path = analysis_file_path
		self.project_Id = project_Id
		self.username = username

		self.project_name = project_service.get_single_project(project_Id).projectName
		rule_settings = rule_service.get_rule_settings_for_analyse(username)

		oss_instance = ObjectStorageService()
		os.mkdir(os.path.join(BASE_PATH, str(self.project_Id) + "-" + self.username))

		for key, value in rule_settings.items():
			if value:
				# 先取数据；然后画图+计算假设检验；再保存统计结果和图片路径；最后上传
				if key == "fileChanges":
					order_no, added_data, modified_data, deleted_data = self.get_file_changes_metric()
					restore_params = self.get_hypothesis_testing_result(order_no, modified_data)
					upload_path, save_path = self.draw_file_changes_plot(order_no, added_data, modified_data, deleted_data)
				else:
					order_no, data = self.get_single_metric(key)
					restore_params = self.get_hypothesis_testing_result(order_no, data)
					upload_path, save_path = self.draw_plot(order_no, data, key)

				url_link = oss_instance.upload_oss_pics(upload_path, save_path)
				analysis_item_dao.insert_new_item(project_Id, url_link, restore_params, key)



	def get_single_metric(self, metric):
		df = pd.read_csv(self.analysis_file_path)
		order_no = []
		data = []
		# index = 0
		for i in range(df[metric].__len__()):
			order_no.append(df['no'][i])
			data.append(df[metric][i])

		if np.isnan(data[-1]):
			data = data[: -1]
			order_no = order_no[: -1]

		return order_no, data

	def draw_plot(self, order_no, data, metric):
		figure, ax = plt.subplots(figsize = (10, 6))

		ax.xaxis.set_major_locator(MultipleLocator(1))

		# 文字
		for label in ax.xaxis.get_ticklabels():
			# label is a Text instance
			label.set_rotation(45)
			label.set_fontsize(16)

		# 文字
		for label in ax.yaxis.get_ticklabels():
			# label is a Text instance
			label.set_fontsize(16)

		ax.plot(order_no, data, 'b', label = " " + metric + " ", lw = 1.5)

		# 设置网格形式
		plt.grid(False)
		# 设置图例显示位置
		plt.legend(loc = "upper left", fontsize = 18)

		plt.tight_layout()

		folder_name = str(self.project_Id) + "-" + self.username
		upload_path = folder_name + "-" + metric + '.png'
		save_path = os.path.join(BASE_PATH, folder_name, metric + self.project_name + '.png')

		plt.savefig(save_path)
		plt.show()

		return upload_path, save_path

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

		if np.isnan(added_data[-1]):
			added_data = added_data[: -1]
			modified_data = modified_data[: -1]
			deleted_data = deleted_data[: -1]
			order_no = order_no[: -1]

		return order_no, added_data, modified_data, deleted_data

	def draw_file_changes_plot(self, order_no, added_data, modified_data, deleted_data):
		figure, ax = plt.subplots(figsize = (10, 6))

		ax.xaxis.set_major_locator(MultipleLocator(1))

		# 文字
		for label in ax.xaxis.get_ticklabels():
			# label is a Text instance
			label.set_rotation(45)
			label.set_fontsize(16)

		# 文字
		for label in ax.yaxis.get_ticklabels():
			# label is a Text instance
			label.set_fontsize(16)

		ax.plot(order_no, added_data, 'r', label = ' add file ', lw = 1.5)  # plt.plot(x,y)，这个将数据画成曲线
		ax.plot(order_no, modified_data, 'g', label = ' modify file ', lw = 1.5)  # plt.plot(x,y)，这个将数据画成曲线
		ax.plot(order_no, deleted_data, 'b', label = ' delete file ', lw = 1.5)  # plt.plot(x,y)，这个将数据画成曲线

		# 设置网格形式
		plt.grid(False)
		# 设置图例显示位置
		plt.legend(loc = "upper left", fontsize = 18)

		plt.tight_layout()

		folder_name = str(self.project_Id) + "-" + self.username

		upload_path = folder_name + '-fileChanges.png'
		save_path = os.path.join(BASE_PATH, folder_name, "fileChanges" + self.project_name + '.png')

		plt.savefig(save_path)
		plt.show()

		return upload_path, save_path

	def get_hypothesis_testing_result(self, x_in, y_in):
		n = len(x_in)

		x_in = np.array(x_in).reshape(-1, 1)
		y_in = np.array(y_in).reshape(-1, 1)

		l_reg = LinearRegression()
		l_reg.fit(x_in, y_in)

		restore_params = []
		restore_params.append(l_reg.coef_[0][0])    # 系数
		restore_params.append(l_reg.intercept_[0])  # 截距

		y_predict = l_reg.predict(x_in)
		regression = sum((y_predict - np.mean(y_in)) ** 2)  # 回归
		residual = sum((y_in - y_predict) ** 2)  # 残差
		r_square = regression / (regression + residual)  # 相关性系数R^2
		restore_params.append(r_square[0])  # R2
		restore_params.append(regression[0])  # SSR
		restore_params.append(residual[0])  # SSE

		f_val = (regression / 1) / (residual / (n - 2))  # F 分布
		pf = stats.f.sf(f_val, 1, n - 2)
		restore_params.append(f_val[0])  # F
		restore_params.append(pf[0])  # pf

		L_xx = n * np.var(x_in)
		sigma = np.sqrt(residual / n)
		t = l_reg.coef_ * np.sqrt(L_xx) / sigma
		pt = stats.t.sf(t, n - 2)
		restore_params.append(t[0][0])  # t
		restore_params.append(pt[0][0])  # pt

		return restore_params

if __name__ == '__main__':
	PresentService().draw_plots_for_project(r"../model/csv_result/19-cao-true_one-analysis.csv", 19, "cao")