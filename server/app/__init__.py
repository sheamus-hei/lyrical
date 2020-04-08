# s/o to solomon for figuring this out
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db = SQLAlchemy()

def create_app():
    app=Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/flasql'
    app.config['SECRET_KEY'] = 'mysecretkey'

    db.init_app(app)
    from app.models import User

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)


    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
    
    from . import auth
    app.register_blueprint(auth.bp)

    from .api import app as main_blueprint
    app.register_blueprint(main_blueprint)

    return app