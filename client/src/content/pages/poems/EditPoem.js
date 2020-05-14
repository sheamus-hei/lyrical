import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditPoem(props) {
    const { id } = useParams();
    const [title, setTitle] = useState("")
    const [publicValue, setPublicValue] = useState("")
    const [message, setMessage] = useState("");
    const [redirect, setRedirect] = useState(false)
    const [poem, setPoem] = useState(null)

    useEffect(() => {
        // axios call to get the poem at the id
        setMessage("");
        axios.get(`${process.env.REACT_APP_SERVER_URL}/poems/${id}`)
        .then(response => {
            if (response.data.error) {
                setMessage(response.data.error);
            }
            if (response.data.result) {
                // console.log("DAT DATA", response.data)
                setPoem(response.data.result.poem);
                setTitle(response.data.result.poem.title);
                setPublicValue(response.data.result.poem.public);
            }
        }).catch(err => {
            console.log(err)
        })
    }, [title, publicValue, id])

    const deletePoem = e => {
        // axios call to delete poem
        e.preventDefault();
        if (props.user) {
            axios.delete(`${process.env.REACT_APP_SERVER_URL}/poems/${poem.id}`, {
                headers: {
                    "Authorization": `Bearer ${props.token}`
                }
            })
            .then(response => {
                if (!response.data.error) {
                    console.log(response.data)
                    setRedirect(true) 
                } else {
                    setMessage(response.data.error);
                }
            }).catch(err => {
                console.log(err);
                setMessage(err.message)
            })
        }
    }

    const handleCheck = e => {
        if (publicValue) {
            setPublicValue(false);
            e.target.checked=false;
        } else {
            setPublicValue(true);
            e.target.checked=true;
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (props.user) {
            axios.put(`https://lyrical-poetry.herokuapp.com/poems/${props.user.id}`, {
                title,
                publicValue
            }, {
                headers: {
                    "Authorization": `Bearer ${props.token}`
                }
            })
            .then(response => {
                if (!response.data.error) {
                    console.log(response.data)
                    setRedirect(true) 
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

    if (redirect == true) {
        return (<Redirect to="/profile" />)
    }
    
    return (
        <div className="simple center">
            <h2 className="fancy">Edit Poem</h2>
            {message}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" placeholder={title} name="title" onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <input type="checkbox" checked={publicValue} name="title" onChange={e => handleCheck(e)} />
                    <label>Make Poem Public</label>
                </div>
                <button className="form-button" type="submit">Update Settings</button>
                <button className="form-button" onClick={deletePoem}>Delete Poem</button>
            </form>
        </div>
    )
}