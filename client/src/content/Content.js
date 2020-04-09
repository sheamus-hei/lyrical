import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import pages here
// import Profile from './pages/profile/Profile';
import Poems from './pages/poems/Poems';
import ShowPoem from './pages/poems/ShowPoem';
import EditPoem from './pages/poems/EditPoem';
import NewPoem from './pages/poems/NewPoem';
import Results from './pages/results/Results';
import ShowResult from './pages/results/ShowResult';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';


export default function Content(props) {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Poems} />
                <Route path="/profile/edit" render={() => <EditProfile user={props.user} updateUser={props.updateUser}/>} />
                <Route path="/profile" render={() => <Profile user={props.user} />} />
                <Route path="/results/:id" render={() => <ShowResult songInfo={props.songInfo} user={props.user} />} />
                <Route path="/results" render={() => <Results songInfo={props.songInfo} setSongInfo={props.setSongInfo} />} />
                <Route path="/poems/edit" render={() => <EditPoem user={props.user} />} />
                <Route path="/poems/new" render={() => <NewPoem user={props.user} />} />
                <Route path="/poems/:id" render={() => <ShowPoem user={props.user} songInfo={props.songInfo} setSongInfo={props.setSongInfo} />} />
                <Route path="/auth/login" render={() => <Login user={props.user} updateUser={props.updateUser} /> } />
                <Route path="/auth/signup" render={() => <Signup user={props.user} updateUser={props.updateUser} /> } />
            </Switch>
        </div>
    )

}