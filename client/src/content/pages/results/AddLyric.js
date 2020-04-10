import React, {useState} from 'react';
import { Link } from 'react-router-dom';

export default function AddLyric(props) {
    const [clicked, setClicked] = useState(false)


    const handleClick = (e) => {
        if (clicked) {
            setClicked(false);
        } else {
            setClicked(true);
        }
    }

    const handleSubmitAdd = (e) => {
        e.preventDefault()
        // do an axios call to add the lyric to the db
        setClicked("submitted")
    }

    let plusButton = (<button onClick={handleClick}>+</button>);
    
    if (clicked) {
        if (!props.user) {
            console.log('THERE BE NO USER')
            plusButton = (<span>
                <Link to='/auth/login'>Log in</Link> to add a lyric to your poem
            </span>)
        } else if (clicked=="submitted") {
            plusButton = (<span>Lyric successfully added!</span>)
        } else {
            // show form to add a poem
            let userPoems = [{ 
                title: "Red Thread", 
                id: 1
            }, {
                title: "Blue Shoes",
                id: 2
            }]
            let options = userPoems.map(poem => {
                return (<option value={poem.id}>{poem.title}</option>)
            })
            let selectPoem = !options? (<p>You don't have any poems. <Link to='/poems/new'>Create a new poem</Link></p>)
                : (<select name="poem_id">{options}</select>)
            plusButton = (<form onSubmit={handleSubmitAdd}>
                <div>
                    <label>Add to poem:</label>
                    {selectPoem}
                    <input type="hidden" name="user_id" value={props.user.name} />
                    <button className="form-button" type="submit">Add Lyric</button>
                </div>
            </form>)
        }
    }

    return (
        <span>
            {plusButton}
        </span>
    )
}