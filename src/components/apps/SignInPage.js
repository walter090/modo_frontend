import React from 'react';
import PropTypes from "prop-types";

import GenericNotification from '../notification/GenericNotification';
import SignInForm from '../formContainer/form/signin/SignInForm'
import SignUpPage from "./SignUpPage";

class SignInPage extends React.Component {
    render() {
        return (
            <div className='form-wrapper'>
                <GenericNotification notification={this.props.notifications}/>
                <SignInForm configNotification={this.props.configNotification}/>
            </div>
        );
    }
}

export default SignInPage;

SignUpPage.propTypes = {
    notifications: PropTypes.array,
    configNotification: PropTypes.func
};
