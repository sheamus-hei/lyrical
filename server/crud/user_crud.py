from flask import jsonify, redirect
from models import db, User

def error(err_locale, error):
    print("ERROR in", err_locale, ":", error)
    return jsonify(error='Server Error')