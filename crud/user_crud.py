from flask import jsonify, redirect, g
from models import db, User

def error(err_locale, error):
    print("ERROR in", err_locale, ":", error)
    return jsonify(error=f'Server Error in {err_locale}', message=f'Server Error in {err_locale}')

def get_user(id):
    try: 
        user = User.query.get(id)
        if user:
            return jsonify(result=user.as_dict())
        else: 
            return jsonify("Couldn't find user at id", id)
    except Exception as error:
        return error('getting a user', error)

def create_user(**kwargs):
    name=kwargs['name']
    email=kwargs['email']
    password=kwargs['password']
    if not name or not email or not password:
        raise Exception('Name, email, and password are required')
    if User.query.filter_by(email=email).first() is not None:
        raise Exception('There is already a user with this email')
    new_user = User(**kwargs)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    g.user = new_user
    token = new_user.generate_token()
    return jsonify(user=new_user.as_dict(), token=token.decode('ascii'))

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

