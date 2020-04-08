import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
// import axios from axios;

export default function Profile(props) {
    let [error, setError] = useState(null)
    
    useEffect(() => {
        // call server to get user's poems 
    }, []);

    if (!props.user) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <h1>{props.user.name}'s Profile</h1>
            <p>This will display a list of your poems</p>
        </div>
    )
}