import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Lyric from './Lyric';


export default function ShowPoem(props) {
    const { id } = useParams();
    const [lyrics, setLyrics] = useState([]);
    const [poem, setPoem] = useState(null);
    const [author, setAuthor] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // axios call to get lyrics 
        axios.get(`${process.env.REACT_APP_SERVER_URL}/poems/${id}`)
        .then(response => {
            if (response.data.error) {
                setMessage(response.data.error);
            }
            if (response.data.result) {
                // console.log("DAT DATA", response.data)
                setPoem(response.data.result.poem);
                setLyrics(response.data.result.lyrics);
                // axios call to get author
                axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${response.data.result.poem.user_id}`)
                .then(res2 => {
                    if (res2.data.result) {
                        setAuthor(res2.data.result)
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
        }).catch(err => {
            console.log(err)
        })
        
        // setLyrics([{
        //     artist: 'One Direction',
        //     song: "What make you beautiful",
        //     thumbnail: "http://www.placekitten.com/100/100",
        //     content: "You don't know, oh, oh...",
        //     annotation: "this is my favorite song",
        //     path: "One-direction-what-makes-you-beautiful-lyrics"
        // }, {
        //     artist: 'Beyonce',
        //     song: "Irreplaceable",
        //     thumbnail: "http://www.placekitten.com/100/100",
        //     content: "Everything you own in a box to the left",
        //     annotation: "this is my 2nd favorite song",
        //     path: "Kendrick-lamar-humble-lyrics"
        // }])
        // setAuthor('Erik');
        // setPoem({title:'Red Thread});
    }, [])

    let editButton = "";
    if (props.user && author && props.user_id == author.id) {
        editButton = (
            <Link to="/poems/edit/">Edit Poem Details</Link>
        )
    }

    let lyricsList = lyrics.length==0 ?
        <p>
            No lyrics added to this poem yet.
        </p>
        : lyrics.map(lyric => {
            return (
                <Lyric lyric={lyric} user={props.user} setSongInfo={props.setSongInfo}/>
            )
        });
    
    let hiddenMessage = poem && poem.public ? "": (<p>(This poem is not public)</p>)
    
    return (
        <div>
            {message}
            <h1>{poem? poem.title : "Loading..."}</h1>
            <h2>by {author? author.name : "unknown"}</h2>
            {hiddenMessage}
            {editButton}
            {lyricsList}
        </div>
    )
}