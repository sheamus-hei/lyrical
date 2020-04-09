import React from 'react';
import { Redirect } from 'react-router-dom';

export default function NewPoem(props) {
    if(!props.user) {
        return <Redirect to='/' />
    }
    
    return (
        <form>
            <p>This is a form to make a new poem</p>
        </form>
    )
}