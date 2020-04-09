import React from 'react';

export default function DeleteLyric(props) {
    const removeLyric = (e) => {
        // axios call to delete lyric in db
    }

    return (
        <button onClick={removeLyric}>Remove this Lyric</button>
    )
}