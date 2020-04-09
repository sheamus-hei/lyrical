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
    if (props.user) {
        deleteButton = (
            <DeleteLyric lyric={props.lyric} />
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
                <p className="hightlight"><b>{props.lyric.content}</b></p>
                <SongThumb 
                    img={props.lyric.thumbnail} 
                    link={props.lyric.path} 
                    title={props.lyric.song}
                    artist={props.lyric.artist}
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