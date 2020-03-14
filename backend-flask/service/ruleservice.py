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