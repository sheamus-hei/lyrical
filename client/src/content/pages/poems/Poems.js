import React, { useState, useEffect } from 'react';

import Thumbnail from '../../components/Thumbnail';


export default function Poems(props) {
    let [poems, setPoems] = useState(null);

    useEffect(() => {
        // axios call to get all public poems
        setPoems([{
            id: 1,
            title: "Red Thread",
            public: true,
            user_id: 1
        }, {
            id: 3,
            title: "Yellow Cello",
            public: true,
            user_id: 2
        }])
    }, [])

    let poemLinks = !poems? "": poems.map(poem => {
        return <Thumbnail id={poem.id} title={poem.title} authorId={poem.user_id} public={true}/>
    })

    return (
        <div>
            <h2>Featured Poems</h2>
            <div>
                {poemLinks}
            </div>
        </div>
    )
}