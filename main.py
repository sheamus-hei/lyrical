#!/usr/bin/env python3
from flask import Flask, jsonify, request, g
from flask_sqlalchemy import SQLAlchemy
from models import app, User, Lyric, Poem, get_or_create
from crud.user_crud import get_user, create_user, update_user
from crud.poem_crud import get_all_poems, get_user_poems, get_poem, create_poem, update_poem, destroy_poem
from crud.lyric_crud import get_lyric, create_lyric, edit_lyric, destroy_lyric
import requests
from bs4 import BeautifulSoup
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired
from flask_httpauth import HTTPTokenAuth

auth = HTTPTokenAuth('Bearer')



# login_manager = LoginManager()
# login_manager.login_view = 'auth.login'
# login_manager.init_app(app)


# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get(int(user_id))

# from . import auth
# app.register_blueprint(auth.bp)

# from .api import app as main_blueprint
# app.register_blueprint(main_blueprint)


    
@app.errorhandler(Exception)
def unhandled_exception(e):
    app.logger.error(f'Unhandled Exception: {e}')
    return jsonify(error=f'Server Error: {e}', message=f'Server Error: {e}')

@auth.verify_token
def verify_token(token):
    s = Serializer(app.config['SECRET_KEY'])
    try:
        data = s.loads(token)
        g.user = User.query.filter_by(id=data["id"]).first()
    except SignatureExpired:
        print("ERROR: signature expired")
        return False
    except BadSignature:
        print("ERROR: invalid signature")
        return False
    return True

@app.route('/auth/login', methods=['POST'])
def authenticate():
    if request.json['email'] is None or request.json['password'] is None:
        raise KeyError('Email and Password required')

    user = User.query.filter_by(email=request.json['email']).first()

    if not user or not user.verify_password(request.json['password']):
        raise Exception("Unauthorized")
    
    g.user = user
    token = user.generate_token()
    return jsonify(user=user.as_dict(), token=token.decode('ascii'), status_code=200)

@app.route('/auth/signup', methods=['POST'])
def signup():
    return create_user(**request.json)

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

@app.route('/api/protected')
@auth.login_required
def get_resource():
  return jsonify({ 'data': 'Hello, %s!' % g.user.name })

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
#@auth.login_required
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
@auth.login_required
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
@auth.login_required
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

