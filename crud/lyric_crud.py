from flask import jsonify, redirect
from models import db, Lyric

def error(err_locale, error):
    print("ERROR in", err_locale, ":", error)
    return jsonify(error=f'Server Error in {err_locale}', message=f'Server Error in {err_locale}')

#there is no get all lyrics function because get poem:id should return that poems lyrics. 

def get_lyric(id):
    try:
        lyric = Lyric.query.get(id)
        if lyric:
            return jsonify(lyric.as_dict())
        else: 
            raise Exception('Error in getting lyric at id', id)
    except Exception as error:
        return error('getting one lyric', error)

def create_lyric(song, artist, thumbnail, content, path, order, poem_id):
    try: 
        new_lyric = Lyric(
            song=song, artist=artist, thumbnail=thumbnail, 
            content=content, path=path, order=order, poem_id=poem_id
        )
        db.session.add(new_lyric)
        db.session.commit()
        return jsonify(result=new_user.as_dict())
    except Exception as error:
        return error('creating a lyric')

# users can only change the annotation or the order
def edit_lyric(id):
    try: 
        lyric = Lyric.query.get(id)
        if lyric:
            lyric.order = order or lyric.order
            # lyric.annotation = annotation or lyric.annotation
            db.session.commit()
            return jsonify(result=user.as_dict())
        else:
            return jsonify('no lyric found at id', id)
    except Exception as error:
        return error('editing a lyric')

def destroy_lyric(id):
    try: 
        lyric = Lyric.query.get(id)
        db.session.delete(lyric)
        db.session.commit()
        return redirect('/')
    except Exception as error:
        return error('deleting a lyric', error)
