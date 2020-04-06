import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default function Nav(props) {
    let links = (
        <span>
            <li className="App-nav-link">
                <Link to="/auth/login" className="App-link">Login</Link>
            </li>
            <li className="App-nav-link">
                <Link to="/auth/signup" className="App-link">Sign up</Link>
            </li>
        </span>
    )

    return (
        <nav>
            <ul>
                {links}
                <li>
                    <Link to="/results" className="App-link">Browse Songs</Link>
                </li>
                <li>
                    <a href="https://github.com/dean-hei/genius-poetry-corner" className="App-link">About</a>
                </li>
            </ul>
        </nav>
    )
}