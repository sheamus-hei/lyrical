import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Results(props) {
    const [songs, setSongs] = useState('');

    useEffect(()=> {
        const api_url=`https://api.genius.com/songs/378195?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`;
        console.log("THE URL WE CALLIN:", api_url)
        axios.get(api_url)
        .then(response => {
            if (response.data) {
                console.log(response.data);
                setSongs(response.data);
            }
        }).catch(err => console.log('💥', err));
    }, []);

    return (
        <div>
            <input type="text" placeholder="search for a song" />
            <h2>This will show a list of songs from the Genius API</h2>
            {songs}
        </div>
    )
}