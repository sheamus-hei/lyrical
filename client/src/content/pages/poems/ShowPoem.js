import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Lyric from './Lyric';


export default function ShowPoem(props) {
    const { id } = useParams();
    const [lyrics, setLyrics] = useState(null);
    const [title, setTitle] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        // axios call to get lyrics and author
        setLyrics([{
            artist: 'One Direction',
            song: "What make you beautiful",
            thumbnail: "http://www.placekitten.com/100/100",
            content: "You don't know, oh, oh...",
            annotation: "this is my favorite song",
            path: "One-direction-what-makes-you-beautiful-lyrics"
        }, {
            artist: 'Beyonce',
            song: "Irreplaceable",
            thumbnail: "http://www.placekitten.com/100/100",
            content: "Everything you own in a box to the left",
            annotation: "this is my 2nd favorite song",
            path: "Kendrick-lamar-humble-lyrics"
        }])
        setAuthor('Erik');
        setTitle('Red Thread')
    }, [])

    let editButton = "";
    if (props.user) {
        editButton = (
            <Link to="/poems/edit/">Edit Poem Details</Link>
        )
    }

    let lyricsList = !lyrics ?
        <div>
            No lyrics added to this poem yet. <Link to='/results'>Browse Songs</Link> to add lyrics.
        </div>
        : lyrics.map(lyric => {
            return (
                <Lyric lyric={lyric} user={props.user} setSongInfo={props.setSongInfo}/>
            )
        });
    
    let hiddenMessage = props.poem && props.poem.public ? "": (<p>This is a secret song</p>)
    
    return (
        <div>
            <h1>{title}</h1>
            <h2>by {author}</h2>
            {hiddenMessage}
            {editButton}
            {lyricsList}
        </div>
    )
}