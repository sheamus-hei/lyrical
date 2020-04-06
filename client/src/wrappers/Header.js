import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';

export default function Header(props) {
    return (
        <header>
            <div>
                <Link to="/" className="App-link">
                    <h1>Genius Poetry Corner</h1>
                </Link>
            </div>
            <Nav />
        </header>
    )
}