#!/usr/bin/env python3
from .models import app, User, Lyric, Poem, get_or_create
from flask import jsonify, request
from crud.user_crud import get_user, create_user, update_user
from crud.poem_crud import get_all_poems, get_user_poems, get_poem, create_poem, update_poem, destroy_poem
from crud.lyric_crud import get_lyric, create_lyric, edit_lyric, destroy_lyric
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


@app.route('/poems')
def poems_get():
    # get all public poems for homepage
    return get_all_poems()

@app.route('/poems/<int:id>')
def poem_get(id):
    # get a poem
    return get_poem(id)

@app.route('/users/<int:id>')
def get_user(id):
    return get_user(id)

@app.route('/profile/<int:user_id>', methods=['GET', 'POST', 'PUT'])
@login_required
def poems_user_get_post(user_id):
    if request.method == 'GET':
        #get user poems
        # how to get user id???
        return get_user_poems(user_id)
    if request.method == 'POST':
        #post a new poem
        return create_poem(
            title=request.form['title'],
            public=request.form['public'],
            user_id=user_id
        )
    if request.method == 'PUT':
        # edit user profile
        return update_user(
            id=user_id,
            email=request.form['email'],
            name=request.form['name'],
            password=request.form['password']
        )

@app.route('/poems/<int:id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
@login_required
def poem_post_put_delete(id):
    if request.method == 'POST':
        # add a song lyric to the poem
        return create_lyric(
            song=request.form['song'],
            artist=request.form['artist'],
            thumbnail=request.form['thumbnail'],
            content=requst.form['content'],
            annotation=requst.form['annotation'],
            order=requst.form['order'],
            poem_id=id
        )
    if request.method == 'PUT':
        # edit the poem (i.e. the title, is public)
        return edit_poem(
            id=id,
            title=request.form['title'],
            public=request.form['public']
        )
    if request.method == 'DELETE':
        # delete the poem
        return destroy_poem(id)

@app.route('/lyrics/<int:id>', methods=['PUT', 'DELETE'])
@login_required
def lyric_put_delete(id):
    if request.method == 'PUT':
        # update the lyric (i.e. the annotation)
        return edit_lyric(
            id=id,
            annotation=requst.form['annotation'],
            order=requst.form['order']
        )
    if request.method == 'DELETE':
        # DELETE THE LYRIC
        return destroy_lyric(id)

