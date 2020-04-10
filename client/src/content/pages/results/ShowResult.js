import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddLyric from './AddLyric';

export default function ShowResult(props) {
    const [lyrics, setLyrics] = useState([]);
    const [error, setError] = useState(null)

    useEffect(() => {
        if (props.songInfo && props.songInfo.link) {
            console.log("SONG INFO MADE IT", props.songInfo)
            axios.get(`${process.env.REACT_APP_SERVER_URL}/songs/${props.songInfo.link}`)
            .then(response => {
                if (response.data.message) {
                    setError(response.data.message);
                    console.log(response.data.err);
                } else {
                    console.log("DAT DATA BE:", response.data);
                    setLyrics(response.data.lyrics);
                }
            }).catch(err => {
                setError(err);
                console.log(err);
            });
        }
        // TEST: REMOVE
        // setLyrics([
        //     "Everyone else in the room can see it",
        //     "Everyone else but you",
        //     "Baby you light up my world like nobody else",
        //     "The way that you flip your wig gets me overwhelmed"
        // ])
    }, [])

    let lyricBody = !lyrics? "" : (
        lyrics.map(line => {
            if (!line || line[0] == '[') {
                return <p><strong>{line}</strong></p>
            }
            return <p>{line}<AddLyric line={line} songInfo={props.songInfo} user={props.user} token={props.token} /></p>
        })
    )

    let body = !props.songInfo? "" : (
        <div>
            <img src={props.songInfo.img} alt="album thumbnail" />
            <h2>{props.songInfo.title}</h2>
            <h3>by {props.songInfo.artist}</h3>
            <p><a href={`https://genius.com/${props.songInfo.link}`}>View Lyrics on Genius.com</a></p>
            <p>{lyricBody}</p>
        </div>
    );
    
    return (
        <div>
            {body}
        </div>
    )
}