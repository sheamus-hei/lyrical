import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function NewPoem(props) {
    const [title, setTitle] = useState('')
    const [publicValue, setPublicValue] = useState(false);
    const [message, setMessage] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        setMessage("");
    }, [title, publicValue])

    const handleCheck = e => {
        e.target.checked? setPublicValue(true) : setPublicValue(false);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (props.user) {
            axios.post(`https://lyrical-poetry.herokuapp.com/profile/${props.user.id}`, {
                title,
                publicValue
            }, {
                headers: {
                    "Authorization": `Bearer ${props.token}`
                }
            })
            .then(response => {
                if (!response.data.error) {
                    setRedirect(true);
                } else {
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
    
    if (redirect) {
        return <Redirect to="/profile" />
    }
    return (
        <div className="simple center">
            <p>{message}</p>
            <h2 className="fancy">Make a New Poem</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" maxLength="11" name="title" onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <input type="checkbox" name="title" onChange={e => handleCheck(e)} />
                    <label>Make Poem Public</label>
                </div>
                <button className="form-button" type="submit">Create Poem</button>
            </form>
        </div>
    )
}