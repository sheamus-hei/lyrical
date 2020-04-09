import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
// import axios from axios;

import Thumbnail from '../../components/Thumbnail';

export default function Profile(props) {
    const [error, setError] = useState(null)
    const [poems, setPoems] = useState(null)
    
    useEffect(() => {
        // call server to get user's poems 
        // axios.get(`${REACT_APP_SERVER_URL}/profile/`)
        setPoems([{
            id: 1,
            title: "Red Thread",
            public: true,
            user_id: 1
        }, {
            id: 2,
            title: "Blue Shoes",
            public: false,
            user_id: 1
        }])
    }, []);

    if (!props.user) {
        return <Redirect to='/' />
    }

    let poemLinks = !poems? "": poems.map(poem => {
        return <Thumbnail id={poem.id} title={poem.title} authorId={poem.user_id} public={poem.public} />
    })

    return (
        <div>
            <h1>{props.user.name}'s Profile</h1>
            <Link to='profile/edit'>Edit Profile</Link>
            <Link to='poems/new'>Make a New Poem</Link>
            <div>
                {poemLinks}
            </div>
        </div>
    )
}