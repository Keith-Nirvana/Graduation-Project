import traceback

from model.rulesettings import Setting
from app import db

class RuleDao(object):

	@staticmethod
	def get_rules_settings_by_user(username):
		try:
			session = db.session
			result = session.query(Setting).filter(Setting.settingsOwner == username).first()
			return result
		except:
			print("Encounter error when searching rule settings by user")
			traceback.print_exc()
		finally:
			session.close()


	@staticmethod
	def insert_base_rule_settings_for_user(username: str):
		try:
			session = db.session
			setting = Setting(True, True, True, True, True, True, True, True, True, username)
			session.add(setting)
			session.commit()
		except:
			print("Encounter error when searching rule settings by user")
			traceback.print_exc()
		finally:
			session.close()

	@staticmethod
	def update_rules_by_user(username, payload):
		try:
			session = db.session
			base_rule = session.query(Setting).filter(Setting.settingsOwner == username).first()

			if base_rule is None:
				return

			base_rule.fileChanges = payload["fileChanges"]
			base_rule.mcc = payload["mcc"]
			base_rule.fileNumber = payload["fileNumber"]
			base_rule.functionNumber = payload["functionNumber"]
			base_rule.fileChangeRate = payload["fileChangeRate"]
			base_rule.functionChangeRate = payload["functionChangeRate"]
			base_rule.loc = payload["loc"]
			base_rule.commentRate = payload["commentRate"]
			base_rule.tarskiModel = payload["tarskiModel"]

			session.commit()
		except:
			print("Encounter error when updating rule settings by user")
			traceback.print_exc()
		finally:
			session.close()