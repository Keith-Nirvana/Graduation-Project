import csv
import os
import hashlib

ANALYZE_RESULT_TITLE = ["no", "fileAdded", "fileModified", "fileDeleted", "mcc",
                        "fileNumber", "functionNumber", "fileChangeRate", "functionChangeRate",
                        "loc", "commentRate", "tarskiModel"]

CSV_ROOT = r"./model/csv_result"

def write_analyze_result(analyze_result, folder_name):
	written_object = []
	for key, values in analyze_result.items():
		new_item = {"no": key}

		file_changes_dict = values.get('fileChanges', None)
		if file_changes_dict is not None:
			values.pop('fileChanges')
			new_item.update(file_changes_dict)

		new_item.update(values)
		written_object.append(new_item)

	target_file_path = os.path.join(CSV_ROOT, folder_name + "-analysis.csv")
	with open(target_file_path, 'a+', newline = '') as f:
		writer = csv.DictWriter(f, ANALYZE_RESULT_TITLE)
		writer.writeheader()
		writer.writerows(written_object)

		print("Successfully write the analysis result")
		return target_file_path


EXT_LIMITATION = [".py", ".cpp", ".c", ".h"]

def get_file_md5(file_path):
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


def get_all_files(root_path):
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

	return true_root_path, file_list