import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';
import SignInPage from './components/apps/SignInPage';
import SignUpPage from './components/apps/SignUpPage';
import NewsListContainer from './components/listContainer/NewsListContainer';
import './components/clickable/Link.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        };

        this.configNotification = this.configNotification.bind(this);

        this.PAGES = {
            '/sign-in/': () => <SignInPage
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
            <div className='app'>
                <Route exact path='/' component={() =>
                    <NewsListContainer/>
                }/>
                <Route path='/sign-in/' component={this.PAGES['/sign-in/']}/>
                <Route path='/sign-up/' component={this.PAGES['/sign-up/']}/>
            </div>
        );
    }
}

export default App;
