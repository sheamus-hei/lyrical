import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default function Nav(props) {

    // links that show when user is not logged in
    let links = (
        <ul>
            <li className="App-nav-link">
                <Link to="/auth/login" className="App-link">Login</Link>
            </li>
            <li className="App-nav-link">
                <Link to="/auth/signup" className="App-link">Sign up</Link>
            </li>
            <li>
                <Link to="/results" className="App-link">Browse Songs</Link>
            </li>
            <li>
<<<<<<< HEAD
                <a href="https://github.com/erik-hei/genius-poetry-corner" target="_blank" rel="noopener noreferrer" className="App-link">About</a>
=======
                <a href="https://github.com/dean-hei/genius-poetry-corner" target="_blank" className="App-link">About</a>
>>>>>>> parent of c59c0ac6... Updates
            </li>
        </ul>
    )

    if (props.user) {
        links = (
            <ul>
                <li className="fancy capitalize">Welcome, {props.user.name}</li>
                <li className="App-nav-link"> 
                    <Link to="/profile" className="App-link">Profile</Link>
                </li>
                <li className="App-nav-link">
                    <Link to="/" onClick={props.logout} className="App-link">Log out</Link>
                </li>
                <li>
                    <Link to="/results" className="App-link">Browse Songs</Link>
                </li>
                <li>
                    <a href="https://github.com/dean-hei/genius-poetry-corner" className="App-link">About</a>
                </li>
            </ul>
        )
    }

    return (
        <nav>
            {links}
        </nav>
    )
}