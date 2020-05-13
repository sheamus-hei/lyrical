import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Grow from '@material-ui/core/Grow';

export default function AddLyric(props) {
    const [clicked, setClicked] = useState(false)
    const [userPoems, setUserPoems] = useState([]);
    const [poemId, setPoemId] = useState(null);

    useEffect(() => {
        // do an axios call to get user poems
        if (props.user) {
            axios.get(`https://lyrical-poetry.herokuapp.com/profile/${props.user.id}`, {
                headers: {
                    "Authorization": `Bearer ${props.token}`
                }
            })
            .then(response => {
                if (response.data.results) {
                    setUserPoems(response.data.results)
                    // set default poem id
                    if (response.data.results.length > 0) {
                        setPoemId(response.data.results[0].id)
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        }
        // setUserPoems([{ 
            //     title: "Red Thread", 
            //     id: 1
            // }, {
            //     title: "Blue Shoes",
            //     id: 2
            // }])
    }, [])


    const handleClick = (e) => {
        if (clicked) {
            setClicked(false);
        } else {
            setClicked(true);
        }
    }

    const handleSubmitAdd = (e) => {
        e.preventDefault()
        // do an axios call to add the lyric to the db
        if (props.user && props.songInfo) {
            let song = props.songInfo.title;
            let artist = props.songInfo.artist;
            let thumbnail = props.songInfo.img;
            let content = props.line;
            let path = props.songInfo.link;
            let order = 1;
            axios.post(`https://lyrical-poetry.herokuapp.com/poems/${poemId}`, {  
                song,
                artist,
                thumbnail,
                content,
                path,
                order
            }, {
                headers: {
                    "Authorization": `Bearer ${props.token}`
                }
            })
            .then(response => {
                if (response.data.result) {
                    setClicked("submitted");
                } 
            }).catch(err => {
                console.log(err);
            })
        }
    }

    let plusButton = (<button className="form-button" onClick={handleClick}>+</button>);
    
    if (clicked) {
        if (!props.user) {
            plusButton = (<span className="lyric-add-text">
                <Link className="basic-link" to='/auth/login'>Log in to add a lyric to your poem</Link>
            </span>)
        } else if (clicked=="submitted") {
            plusButton = (<span className='lyric-add-text'>Lyric successfully added!</span>)
        } else {
            // show form to add a poem
            let options = userPoems.map(poem => {
                return (<option value={poem.id}>{poem.title}</option>)
            })
            let selectPoem = options.length < 1 ? (<p class="lyric-add-text">You don't have any poems. <Link className='basic-link' to='/poems/new'>Create a new poem?</Link></p>)
            : (<select onChange={(e) => {setPoemId(e.target.value)}}
                    name="poem_id">{options}</select>)
            plusButton = (
                <form onSubmit={(e) => handleSubmitAdd(e)}>
                    <div className="arrow"></div>
                    <Grow in={clicked}>
                        <div className="songthumb">
                            <label>Add to poem:</label>
                            {selectPoem}
                            <button className="form-button" type="submit">Add Lyric</button>
                        </div>
                    </Grow>
                </form>
            )
        }
    }

    return (
        <span>
            {plusButton}
        </span>
    )
}