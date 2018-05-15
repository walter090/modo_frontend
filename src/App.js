import React, {Component} from 'react';
import './App.css';

import SignUpPage from './components/apps/SignUpPage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        };

        this.configNotification = this.configNotification.bind(this);
    }

    configNotification(value) {
        this.setState(prev => ({
            notifications: prev.notifications.concat([value])
        }));
    }

    render() {
        return (
            <SignUpPage notifications={this.state.notifications}
                        configNotification={this.configNotification}
            />
        );
    }
}

export default App;
