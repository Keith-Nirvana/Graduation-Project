from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

def create_app():
	app = Flask(__name__)
	app.config['DEBUG'] = True
	app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite+pysqlite:///./testdb.db'
	app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
	CORS(app)

	return app


def create_database(app):
	print("Create Database")
	db = SQLAlchemy(app)
	return db

# def register(app):
# 	from router import api_blueprint
# 	app.register_blueprint(api_blueprint)

app = create_app()
db = create_database(app)
session = db.session

from router import api
api.init_app(app)

if __name__ == '__main__':
	app.run(debug = True)
