import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import LandingPage from './landing-page/landing-page';
import ChatRoom from './chat-room/chat-room';

class App extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={LandingPage}/>
                <Route path='/chat' component={ChatRoom}/>
                <Route render={() => (
                    <Redirect to='/'/>
                )}/>
            </Switch>
        );
    }
}

export default App;