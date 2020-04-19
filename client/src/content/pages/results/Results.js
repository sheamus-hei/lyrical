import React, { useState } from 'react';
import axios from 'axios';
// import { Route, Switch } from 'react-router-dom';
import SongThumb from './SongThumb';
// import Grow from '@material-ui/core/Grow';


export default function Results(props) {
    // OVERVIEW
    // take user input via searchbar and call query search on genius api
    // like so: https://api.genius.com/search?q=Kendrick%20Lamar&access_token=...
    // then loop through the results with response.type == "song"
    // for each song show a thumbnail using the title, author, thumb img, and URL path

    const [songs, setSongs] = useState([]);
    const [query, setQuery] = useState('');

    const handleSubmit = e => {
        e.preventDefault()
        const api_url=`https://api.genius.com/search?q=${query}&access_token=${process.env.REACT_APP_CLIENT_ACCESS_TOKEN}`;
        axios.get(api_url)
        .then(response => {
            if (response.data) {
                setSongs(response.data.response.hits.map(hit => {
                    if (hit.type == "song") {
                        return hit.result
                    }
                }))
                // console.log("⭐️", songs)
            } 
        }).catch(err => console.log('💥', err));
    }

    let key = 0;
    
    let songLinks = !songs ? "" : (
        songs.map(song => {
            key++;
            return <SongThumb artist={song.primary_artist.name}
                img={song.song_art_image_thumbnail_url}
                link={song.path.split("/")[1]}
                title={song.title_with_featured}
                key={key}
                songInfo={props.songInfo}
                setSongInfo={props.setSongInfo}
            />
        })
    );

    return (
        <div>
            <h2 className="fancy">Browse Songs</h2>
            <form className="search" onSubmit={handleSubmit}>
                <button className="invisible" type="submit">🔍</button>
                <input type="text" placeholder="Search for a song or artist" onChange={e => setQuery(e.target.value)}/>
            </form>
            {songs.length==0? "":(<h2 className="page-header">Results</h2>)}
            {/* <Grow in="true"
          style={{ transformOrigin: '50% 0 0' }}
          {...{ timeout: 1000 }}> */}
                <div className="poems">
                    {songLinks}
                </div>
            {/* </Grow> */}
        </div>
    )
}