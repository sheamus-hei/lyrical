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
    return (
        <div>
            <img src={props.img} alt="thumbnail image" />
            <Link to={`/results/${props.link}`} onClick={handleLinkClick}>
                <h2>{props.title}</h2>
            </Link>
            <h3>by {props.artist}</h3>
        </div>
    )
}