import React from 'react';
import PropTypes from 'prop-types';

import GenericNotification from '../notification/GenericNotification';
import SignUpForm from '../formContainer/form/signup/SignUpForm';

class SignUpPage extends React.Component {
    render() {
        return (
            <div className='form-wrapper'>
                <GenericNotification notification={this.props.notifications}/>
                <SignUpForm configNotification={this.props.configNotification}/>
            </div>
        );
    }
}

export default SignUpPage;

SignUpPage.propTypes = {
    notifications: PropTypes.array,
    configNotification: PropTypes.func
};
