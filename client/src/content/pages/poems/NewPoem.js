import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function NewPoem(props) {
    const [title, setTitle] = useState('')
    const [publicValue, setPublicValue] = useState(false)
    let [message, setMessage] = useState("");

    useEffect(() => {
        setMessage("");
    }, [title, publicValue])

    const handleCheck = e => {
        e.target.checked? setPublicValue(true) : setPublicValue(false)
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (props.user) {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/profile/${props.user.id}`, {
                title,
                publicValue
            }, {
                headers: {
                    "Authorization": `Bearer ${props.token}`
                }
            })
            .then(response => {
                if (response.data.results) {
                    return (<Redirect to="/profile" />);
                } else if (response.data.error) {
                    setMessage(response.data.error);
                }
            }).catch(err => {
                console.log(err);
                setMessage(err.message)
            })
        }
    }

    if(!props.user) {
        return <Redirect to='/' />
    }
    
    return (
        <div>
            <p>{message}</p>
            <h2>Make a New Poem</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <input type="checkbox" name="title" onChange={e => handleCheck} />
                    <label>Make Poem Public</label>
                </div>
                <button className="form-button" type="submit">Create Poem</button>
            </form>
        </div>
    )
}