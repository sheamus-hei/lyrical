import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function EditPoem(props) {
    const [title, setTitle] = useState("")
    const [publicValue, setPublicValue] = useState("props.poem.public")
    let [message, setMessage] = useState("");

    const deletePoem = e => {
        // axios call to delete poem
        return(<Redirect to='/profile' />)
    }

    useEffect(() => {
        // axios call to get the poem at the id
        setTitle("Red Thread")
        setPublicValue(true)
        setMessage("");
    }, [title, publicValue])

    const handleCheck = e => {
        e.target.checked? setPublicValue(true) : setPublicValue(false)
    }

    const handleSubmit = e => {
        // e.preventDefault()
        // fetch(`${process.env.REACT_APP_SERVER_URL}/profile`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         title,
        //         publicValue,
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
        return (<Redirect to="/profile" />)
    }

    if(!props.user) {
        return <Redirect to='/' />
    }
    
    return (
        <div>
            <h2>Edit Poem</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" placeholder={title} name="title" onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <input type="checkbox" checked={publicValue} name="title" onChange={e => handleCheck} />
                    <label>Make Poem Public</label>
                </div>
                <button className="form-button" type="submit">Update Settings</button>
                <button className="form-button" onClick={deletePoem}>Delete Poem</button>
            </form>
        </div>
    )
}