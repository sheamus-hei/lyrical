from models import app, User, Lyric, Poem, get_or_create
from flask import jsonify, request
# from crud.user_crud import (CRUD METHODS HERE)

@.errorhandler(Exception)
def unhandled_exception(e):
    app.logger.error('Unhandled Exception: %s')
    return jsonify(error='Server Error')

@app.route('/users', method)