import React from 'react';
import PropTypes from 'prop-types';

import FormInput from '../FormInput';
import FormVlidation from '../FormValidation';
import ValidationError from '../ValidationError';
import GenericButton from '../../../button/GenericButton';

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: '',
                erroneous: false,
                message: []
            },
            password: {
                value: '',
                erroneous: false,
                message: []
            },
            loading: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateSubmission = this.validateSubmission.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: {
                value: value,
                erroneous: false,
                message: []
            }
        });
    }

    validateSubmission(e) {
        e.preventDefault();
    }

    render() {
        return(
            <form className='signin-form'>
                <FormInput
                    label='Email'
                    name='email'
                    type='email'
                    id='signin-email'
                    value={this.state.email.value}
                    erroneous={this.state.email.erroneous}
                    message={this.state.email.message}
                    onChange={this.handleInputChange}
                />
                <FormInput
                    label='Password'
                    name='password'
                    type='password'
                    id='signin-password'
                    value={this.state.password.value}
                    erroneous={this.state.password.erroneous}
                    message={this.state.password.message}
                    onChange={this.handleInputChange}
                />
                <GenericButton text={this.state.loading ? 'Signing up' : 'Sign up'}
                               loading={this.state.loading}
                               onClick={this.validateSubmission}/>
            </form>
        );
    }
}

export default SignInForm;

SignInForm.propTypes = {};
