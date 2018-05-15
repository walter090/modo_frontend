import React from 'react';

import GenericNotification from '../notification/GenericNotification';
import SignUpForm from '../formContainer/form/signin/SignInForm';

class SignUpPage extends React.Component {
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
            <div className='form-wrapper'>
                <GenericNotification notification={this.state.notifications}/>
                <SignUpForm configNotification={this.configNotification}/>
            </div>
        );
    }
}

export default SignUpPage;
