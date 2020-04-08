from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import login_user, logout_user, login_required
from app.models import db, User

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/login', methods=['POST'])
def login():
    if method == 'POST':
    email = request.form.get('email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, pasword):
        flash('Please check in your login credentials and try again.')
        return redirect(url_for('api.login'))

    login_user(user, remember=remember)

    return redirect(url_for('bp.profile'))

@bp.route('/signup', methods=['POST'])
def signup():
    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')

    user = User.query.filter_by(email=email).first()

    if user:
        flash('Email address already exists.')
        return redirect(url_for('bp.login'))

    new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'))

    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for('bp.profile'))

@bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('/')

# # for login required views
# def login_required(view):
#     @functools.wraps(view)
#     def wrapped_view(**kwargs):
#         if g.user is None:
#             return redirect(url_for('auth.login'))

#         return view(**kwargs)

#     return wrapped_view