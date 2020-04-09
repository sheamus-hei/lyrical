import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function NewPoem(props) {
    const [title, setTitle] = useState('')
    const [public, setPublic] = useState(false)
    let [message, setMessage] = useState("");

    useEffect(() => {
        setMessage("");
    }, [title, public])

    const handleCheck = e => {
        e.target.checked? setPublic(true) : setPublic(false)
    }

    const handleSubmit = e => {
        // e.preventDefault()
        // fetch(`${process.env.REACT_APP_SERVER_URL}/profile`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         title,
        //         public,
        //         user_id: 1
        //     })
        // }).then(response => {
        //     if (!response.ok) {
        //         console.log(response);
        //         setMessage(`${response.status}: ${response.statusText}`);
        //         return;
        //     } else {
        //         setRedirect(<Redirect to={`/`} />)    
        // })
        return (<Redirect to="/profile")
    }

    if(!props.user) {
        return <Redirect to='/' />
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" name="title" onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                <input type="checkbox" name="title" onChange={e => handleCheck} />
                <label>Make Poem Public</label>
            </div>
            <button className="form-button" type="submit">Create Recipe!</button>
        </form>
    )
}