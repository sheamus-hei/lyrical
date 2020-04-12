import React, {useState} from 'react';
import SongThumb from '../results/SongThumb';
import DeleteLyric from './DeleteLyric';

export default function Lyric(props) {
    const [clicked, setClicked] = useState(false);

    const handleClick = (e) => {
        if (clicked) {
            setClicked(false);
        } else {
            setClicked(true);
        }
    }

    let deleteButton = ""
    if (props.user && props.user.id === props.authorId) {
        deleteButton = (
            <DeleteLyric lyric={props.lyric} token={props.token} 
            user={props.user} poemId={props.poemId}/>
        )
    }

    let display = (
        <div>
            <p className="gray-bg">{props.lyric.content}</p>
        </div>
    );

    if (clicked) {
        display = (
            <div>
                <p className="gray-bg highlight">{props.lyric.content}</p>
                <div className="arrow"></div>
                <SongThumb 
                    img={props.lyric.thumbnail} 
                    link={props.lyric.path} 
                    title={props.lyric.song}
                    artist={props.lyric.artist}
                    setSongInfo={props.setSongInfo}
                />
                {deleteButton}
            </div>
        );
    }

    return (
        <div onClick={handleClick}>
            {display}
        </div>
    );
}