import React, { useState } from 'react';
import axios from 'axios';

export default function DeleteLyric(props) {
    const [deleteRedirect, setDeleteRedirect] = useState(false);

    const removeLyric = (e) => {
        // axios call to delete lyric in db
        e.preventDefault()
        // do an axios call to add the lyric to the db
        if (props.user) {
            axios.delete(`https://lyrical-poetry.herokuapp.com/lyrics/${props.lyric.id}`, {
                headers: {
                    "Authorization": `Bearer ${props.token}`
                }
            })
            .then(response => {
                if (response.data) {
                    setDeleteRedirect(true);
                } 
            }).catch(err => {
                console.log(err);
            })
        }
    }

    if (deleteRedirect) {
        return (<p class="lyric-add-text">Lyric successfully deleted! (Refresh to see changes)</p>)
    }

    return (
        <button class="form-button" onClick={(e) => removeLyric(e)}>Remove this Lyric</button>
    )
}