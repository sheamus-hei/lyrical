from flask import jsonify, redirect
from models import db, Poem

def error(err_locale, error):
    print("ERROR in", err_locale, ":", error)
    return jsonify(error='Server Error')

def get_all_poems():
    try:
        all_poems = Poem.query.all() #TODO where public == true
        results = [poem.as_dict() for poem in all_poems]
        return jsonify(results)
    except Exception as error:
        return error('getting all poems', error)