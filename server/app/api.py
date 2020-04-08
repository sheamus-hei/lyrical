#!/usr/bin/env python3
from models import app, User, Lyric, Poem, get_or_create
from flask import jsonify, request
# from crud.user_crud import (CRUD METHODS HERE)
import requests
from bs4 import BeautifulSoup


@app.errorhandler(Exception)
def unhandled_exception(e):
    app.logger.error('Unhandled Exception: %s')
    return jsonify(error='Server Error')

# data scraping. see testAPI for details
@app.route('/songs/<string:id>', methods=['GET'])
def get_song_lyrics(id):
    if request.method== 'GET':
        page = requests.get("https://genius.com/" + id)
        html = BeautifulSoup(page.text, "html.parser")
        [h.extract() for h in html('script')]
        lyrics = html.find("div", class_="lyrics").get_text() #updated css where the lyrics are based in HTML
        lyrics = lyrics.split('\n')
        return jsonify(lyrics=lyrics)

# @app.route('/profile', methods=['GET', 'PUT'])
# def profile_get_put():
#     # if request.method == 'GET':
#     #     return get_all_users()
#     # if request.method == 'PUT':
#     #     return update_user(
#     #         name=request.form['name'],
#     #         email=request.form['email']
#     #     )
#     pass

# @app.route('/poems', methods=['GET', 'POST'])
# def poems_get_post():
#     pass

# @app.route('/poems/<int:id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
# def poem_get_post_put_delete():
#     pass

# @app.route('/poems/<int:id>/lyrics/<int:l_id>', methods=['DELETE'])
# def poem_lyric_delete():
#     pass

# @app.route('/auth/login', methods=['POST'])
# def login():
#     pass

# @app.route('/auth/signup', methods=['POST'])
# def login():
#     pass