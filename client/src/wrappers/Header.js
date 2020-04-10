import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';

export default function Header(props) {
    return (
        <header>
            <div>
                <Link to="/" className="App-link">
                    <h1>Lyrical.</h1>
                </Link>
            </div>
            <Nav logout={props.logout} user={props.user} />
        </header>
    )
}