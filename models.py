from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from passlib.apps import custom_app_context as pwd_context
from flask_login import UserMixin
from flask_cors import CORS

app=Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"]="postgres://dcruhdnliqennn:a98d175ad3b5c9ac069f842be27bd197d76b6527eaef360cb96f71b9cc71dec5@ec2-18-206-84-251.compute-1.amazonaws.com:5432/dabs9moh7qn1bn"
db = SQLAlchemy(app)
app.app_context().push()

class User(UserMixin, db.Model):
    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String, default="Anonymous Poet") 
    password = db.Column(db.String, nullable=False)

    poems = db.relationship('Poem', backref='user', lazy=True)

    def __repr__(self):
        return f'User(id={self.id}, email={self.email}, name={self.name})'
    
    def as_dict(self):
        user_dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        del user_dict['password']
        return user_dict

    def set_password(self, password):
        self.password = pwd_context.encrypt(password)

    def verify_password(self, typed_password):
        return pwd_context.verify(typed_password, self.password)

    def generate_token(self, expiration=60*10*10):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({ 'id': self.id })

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
    path = db.Column(db.String)
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