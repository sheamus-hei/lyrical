from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/flasql'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String, nullable=False) 
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

# class Lyric(db.Model):
#     pass

# def get_or_create(model, defaults=None, **kwargs):
#     instance = db.session.query(model).filter_by(**kwargs).first()
#     if instance:
#         return instance, False
#     else:
#         params = dict((k, v) for k, v in kwargs.items())
#         params.update(defaults or {})
#         instance = model(**params)
#         db.session.add(instance)
#         db.session.commit()
#         return instance, True