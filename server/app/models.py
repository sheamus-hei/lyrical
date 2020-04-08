from flask import Flask
from app import db
from flask_login import UserMixin
# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()

class User(UserMixin, db.Model):
    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String, default="Anonymous Poet") 
    password = db.Column(db.String(30))

    poems = db.relationship('Poem', backref='user', lazy=True)

    def __repr__(self):
        return f'User(id={self.id}, email={self.email}, name={self.name})'
    
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Poem(db.Model):
    __tablename__='poems'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    public = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='SET NULL'))

    def __repr__(self):
        return f'Poem(id={self.id}, title={self.title}, public={self.public}, user_id={self.user_id})'

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Lyric(db.Model):
    __tablename__='lyrics'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    annotation = db.Column(db.String)
    song = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)
    thumbnail = db.Column(db.String, nullable=False)
    order = db.Column(db.Integer)
    poem_id = db.Column(db.Integer, db.ForeignKey('poems.id', ondelete='SET NULL'))
    
    def __repr__(self):
        return f'Lyric(id={self.id}, content={self.content}, song={self.song}, artist={self.artist}, order={self.order}, thumbnail={self.thumbnail}, poem_id={self.poem_id})'

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}



def get_or_create(model, defaults=None, **kwargs):
    instance = db.session.query(model).filter_by(**kwargs).first()
    if instance:
        return instance, False
    else:
        params = dict((k, v) for k, v in kwargs.items())
        params.update(defaults or {})
        instance = model(**params)
        db.session.add(instance)
        db.session.commit()
        return instance, True