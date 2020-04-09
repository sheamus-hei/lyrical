import React from 'react';
import { Redirect } from 'react-router-dom';

export default function EditPoem(props) {
    if(!props.user) {
        return <Redirect to='/' />
    }
    
    return (
        <form>
            <p>This is a form to edit a poem</p>
        </form>
    )
}