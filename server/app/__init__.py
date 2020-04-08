from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import flask_login


def create_app():
    app=Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/flasql'

    db = SQLAlchemy()

    login_manager = LoginManager()
    login_manager.init_app(app)

    from . import auth
    app.register_blueprint(auth.bp)

    return app