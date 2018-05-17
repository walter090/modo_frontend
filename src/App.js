import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import './App.css';
import SignInPage from './components/apps/SignInPage';
import SignUpPage from "./components/apps/SignUpPage";
import './components/clickable/Link.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        };

        this.configNotification = this.configNotification.bind(this);

        this.PAGES = {
            '/': () => <SignInPage
                notifications={this.state.notifications}
                configNotification={this.configNotification}
            />,
            '/sign-up/': () => <SignUpPage
                notifications={this.state.notifications}
                configNotification={this.configNotification}
            />
        };
    }

    configNotification(value) {
        this.setState(prev => ({
            notifications: prev.notifications.concat([value])
        }));
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={this.PAGES['/']}/>
                    <Route path='/sign-up/' component={this.PAGES['/sign-up/']}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
