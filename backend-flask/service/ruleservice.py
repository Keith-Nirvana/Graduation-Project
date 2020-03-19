import json

from factory import daofactory

class RuleService(object):
	def __init__(self):
		self.rule_dao = daofactory.rule_dao

	def search_rule_base(self, username: str):
		return self.rule_dao.get_rules_settings_by_user(username)

	def update_rules_by_user(self, username: str, settings: dict):
		return self.rule_dao.update_rules_by_user(username, payload = settings)

	def add_basic_rules_setting_for_user(self, username):
		return self.rule_dao.insert_base_rule_settings_for_user(username)

	def get_rule_settings_for_analyse(self, username):
		rule_settings_object = self.rule_dao.get_rules_settings_by_user(username)
		result = rule_settings_object.serialize()

		result.pop("id")
		result.pop("settingsOwner")

		return result

	def is_no_rule_needed_for_analyse(self, username):
		rule_settings_to_test = self.get_rule_settings_for_analyse(username)

		for key, values in rule_settings_to_test.items():
			if values:
				return False
		return True