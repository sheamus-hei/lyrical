import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';

export default function Header(props) {
    return (
        <header>
            <div>
                <Link to="/" className="App-link">
                    <div className="jaunty">
                        <h1>Lyrical<span className="lightblue">.</span></h1>
                    </div>
                </Link>
                <h3>songs to poetry</h3>
            </div>
            <Nav logout={props.logout} user={props.user} />
        </header>
    )
}