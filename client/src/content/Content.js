import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

// import pages here
// import Profile from './pages/profile/Profile';
import Poems from './pages/poems/Poems';
import Results from './pages/results/Results';
import ShowResult from './pages/results/ShowResult';


export default function Content(props) {
    const [songInfo, setSongInfo] = useState({});
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Poems} />
                {/* <Route path="/profile/edit" render={() => <EditProfile user={props.user} />} />
                <Route path="/profile" render={() => <Profile user={props.user} />} /> */}
                <Route path="/results" render={() => <Results songInfo={songInfo} setSongInfo={setSongInfo} />} />
                <Route path="/results/:id" render={() => <ShowResult songInfo={songInfo} />} />
                {/*<Route path="/poems/new" render={() => <NewPoem user={props.user} />} />
                <Route path="/poems/:id" render={() => <ShowPoem user={props.user} />} />
                <Route path="/auth/login" render={() => <Login user={props.user} updateUser={props.updateUser} /> } />
                <Route path="/auth/signup" render={() => <Signup user={props.user} updateUser={props.updateUser} /> } /> */}
            </Switch>
        </div>
    )

}