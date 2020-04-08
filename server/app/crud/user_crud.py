from flask import jsonify, redirect
from models import db, User

def error(err_locale, error):
    print("ERROR in", err_locale, ":", error)
    return jsonify(error='Server Error')

def get_user(id):
    try: 
        user = User.query.get(id)
        if user:
            return jsonify(user.as_dict())
        else: 
            return jsonify("Couldn't find user at id", id)
    except Exception as error:
        return error('getting a user', error)

def create_user(name, email, password):
    try:
        new_user = User(name=name, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.as_dict())
    except Exception as error:
        return error('creating a user', error)

def update_user(id, name, email, password):
    try: 
        user = User.query.get(id)
        if user:
            user.email = email or user.email
            user.name = name or user.name
            user.password = password or user.password
            db.session.commit()
            return jsonify(user.as_dict())
        else: 
            return jsonify('error finding user at id', id)
    except Exception as error:
        return error('updating a user', error)

