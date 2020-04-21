import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddLyric from './AddLyric';
import Fade from '@material-ui/core/Fade';


export default function ShowResult(props) {
    const [lyrics, setLyrics] = useState([]);
    const [error, setError] = useState(null)

    useEffect(() => {
        if (props.songInfo && props.songInfo.link) {
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
                return <div className="lyric-break"><strong>{line}</strong></div>
            }
            return <div className="lyric-line">{line}<AddLyric line={line} songInfo={props.songInfo} user={props.user} token={props.token} /></div>
        })
    )

    let resultStyle = !props.songInfo? "" :{
        backgroundImage: 'url(' + props.songInfo.img + ')'
    }

    let body = !props.songInfo? "" : (
        <div className="simple">
            <div className="result-header">
                <div style={resultStyle} className="result-img" alt="album thumbnail">
                </div>
                <div className="result-text">
                    <h2>{props.songInfo.title}</h2>
                    <h3>by {props.songInfo.artist}</h3>
                    <p className="basic-link"><a href={`https://genius.com/${props.songInfo.link}`}>View Lyrics on Genius.com</a></p>
                </div>
            </div>
            <Fade in="true">
                <div>{lyricBody}</div>
            </Fade>
        </div>
    );
    
    return (
        <div>
            {body}
        </div>
    )
}