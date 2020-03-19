import re

class CommentCounter(object):

	@staticmethod
	def get_comment_analysis_for_C_file(file_path: str):
		with open(file_path, 'r') as f:
			line_list = f.readlines()

		line_no, total_lines = 0, len(line_list)
		code_lines, comment_lines = 0, 0

		while line_no < total_lines:
			if line_list[line_no].isspace():  # 空行
				line_no += 1
				continue

			reg_match = re.match("^([^/]*)/(/|\*)+(.*)$", line_list[line_no].strip())
			if reg_match is not None:  # 注释行
				comment_lines += 1

				# 代码&注释混合行
				if reg_match.group(1) != '':
					code_lines += 1
				elif reg_match.group(2) == '*' and re.match('^.*\*/.+$', reg_match.group(3)) is not None:
					code_lines += 1

				# 行注释或单行块注释
				if '/*' not in line_list[line_no] or '*/' in line_list[line_no]:
					line_no += 1
					continue

				# 跨行块注释
				line_no += 1
				while '*/' not in line_list[line_no]:
					if not line_list[line_no].isspace():
						comment_lines += 1
					line_no = line_no + 1
					continue

				comment_lines += 1  # '*/'所在行

			else:  # 代码行
				code_lines += 1

			line_no += 1

		return code_lines, comment_lines

	@staticmethod
	def get_comment_analysis_for_python_file(file_path: str):
		return 0, 0