from flask_restplus import Api

# api_blueprint = Blueprint("open_api", __name__, url_prefix = "/api")
api = Api(
	version = '1.0',
	title = 'Evolution-Analyzer',
	description = '基于区块链的软件演化分析系统',
	doc = "/doc/"
)

from router.user import ns as user_ns
from router.project import ns as project_ns
from router.rulesettings import ns as rules_settings_ns

api.add_namespace(user_ns)
api.add_namespace(project_ns)
api.add_namespace(rules_settings_ns)
