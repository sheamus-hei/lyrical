import React from 'react';
import { Link } from 'react-router-dom';

export default function SongThumb(props) {
    const handleLinkClick = e => {
        props.setSongInfo({
            img: props.img,
            link: props.link,
            title: props.title,
            artist: props.artist
        })
    }

    let divStyle= {
        backgroundImage: 'url(' + props.img + ')'
    }
    return (
        <div className="songthumb">
            <div style={divStyle} className="songthumb-img" alt="album thumbnail">
            </div>
            <div className="songthumb-text">
                <Link to={`/results/${props.link}`} onClick={handleLinkClick}>
                    <h2 className="basic-link">{props.title}</h2>
                </Link>
                <h3>{props.artist}</h3>
            </div>
        </div>
    )
}