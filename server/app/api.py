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


@app.route('/poems', methods=['GET'])
def poems_get():
    # get all public poems for homepage
    pass

@app.route('/poems/<int:id>', methods=['GET'])
def poem_get(id):
    # get a poem
    pass

@app.route('/profile', methods=['GET', 'POST'])
@login_required
def poems_user_get_post():
    if request.method == 'GET':
        #get user poems
    if request.method == 'POST':
        #post a new poem

@app.route('/poems/<int:id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
@login_required
def poem_post_put_delete(id):
    if request.method == 'POST':
        # add a song lyric to the poem
    if request.method == 'PUT':
        # edit the poem (i.e. the title, is public)
    if request.method == 'DELETE':
        # delete the poem

@app.route('/poems/<int:id>/lyrics/<int:lyr_id>', methods=['PUT', 'DELETE'])
@login_required
def lyric_put_delete(id, lyr_id):
    if request.method == 'PUT'
        # update the lyric (i.e. the annotation)
    if request.method == 'DELETE'
        # DELETE THE LYRIC

