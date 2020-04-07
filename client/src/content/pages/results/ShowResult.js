import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ShowResult(props) {
    const [lyrics, setLyrics] = ("");
    const [error, setError] = 

    useEffect(() => {
        if (props.songInfo && props.songInfo.link) {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/songs/${props.songInfo.link}`)
            .then(response => {
                if (response.data.message) {
                    setError(response.data.message);
                    console.log(response.data.err);
                } else {
                    console.log("DAT DATA BE:", response.data);
                    setSong(response.data);
                }
            }).catch(err => {
                setError(err);
                console.log(err);
            });
        }
    }, [])

    let lyricBody = props.songinfo? "" : (
        lyrics.map(line => {
            return <p>{line}</p>
        })
    )

    let body = !props.songInfo? "" : (
        <div>
            <img src={props.songInfo.img} alt="album thumbnail" />
            <h2>{props.songInfo.title}</h2>
            <h3>by {props.songInfo.artist}</h3>
            <p>{lyricBody}</p>
        </div>
    );
    
    return (
        <div>
            {body}
        </div>
    )
}