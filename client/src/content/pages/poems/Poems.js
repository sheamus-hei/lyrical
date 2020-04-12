import React, { useState, useEffect } from 'react';

import Thumbnail from '../../components/Thumbnail';
import axios from 'axios';

export default function Poems(props) {
    let [poems, setPoems] = useState(null);

    useEffect(() => {
        // axios call to get all public poems
        axios.get(`${process.env.REACT_APP_SERVER_URL}/poems`)
        .then(response => {
            if (response.data.results) {
                setPoems(response.data.results)
            }
        }).catch(err => {
            console.log(err)
        })
        // TEST DATA
        // setPoems([{
        //     id: 1,
        //     title: "Red Thread",
        //     public: true,
        //     user_id: 1
        // }, {
        //     id: 3,
        //     title: "Yellow Cello",
        //     public: true,
        //     user_id: 2
        // }])
    }, [])

    let poemLinks = !poems? "": poems.map(poem => {
        return <Thumbnail id={poem.id} title={poem.title} authorId={poem.user_id} public={true}/>
    })

    return (
        <div>
            <h2 className="page-header">Featured Poems</h2>
            <div className="poems">
                {poemLinks}
            </div>
        </div>
    )
}