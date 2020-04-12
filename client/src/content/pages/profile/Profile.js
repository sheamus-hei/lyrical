import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import Thumbnail from '../../components/Thumbnail';

export default function Profile(props) {
    const [error, setError] = useState(null)
    const [poems, setPoems] = useState(null)
    
    useEffect(() => {
        // call server to get user's poems 
        if (props.user) {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/profile/${props.user.id}`, {
                headers: {
                    "Authorization": `Bearer ${props.token}`
                }
            })
            .then(response => {
                if (response.data.results) {
                    setPoems(response.data.results)
                }
            }).catch(err => {
                console.log(err)
            })
        }

        // TEST DATA
        // setPoems([{
        //     id: 1,
        //     title: "Red Thread",
        //     public: true,
        //     user_id: 1
        // }, {
        //     id: 2,
        //     title: "Blue Shoes",
        //     public: false,
        //     user_id: 1
        // }])
    }, []);

    if (!props.user) {
        return <Redirect to='/' />
    }

    let poemLinks = !poems? "": poems.map(poem => {
        return <Thumbnail id={poem.id} title={poem.title} authorId={poem.user_id} public={poem.public} />
    })

    return (
        <div>
            <h1 className="page-header capitalize">{props.user.name}'s Profile</h1>
            <div class="profile-links">
                <Link to='profile/edit' className="basic-link">Edit Profile</Link>
                <span className="spacer">|</span>
                <Link to='poems/new' className="basic-link">Make a New Poem</Link>
            </div>
            <div className="poems">
                {poemLinks}
            </div>
        </div>
    )
}