import React from 'react';
import PropTypes from 'prop-types';

import validate from './FormValidation'
import FormInput from './FormInput';
import './From.css'
import GenericButton from "../../button/GenericButton";

import callAPI from '../../../api-config'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            firstName: '',
            lastName: '',

            emailError: {
                erroneous: false,
                message: []
            },
            usernameError: {
                erroneous: false,
                message: []
            },
            passwordError: {
                erroneous: false,
                message: []
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.validateSubmission = this.validateSubmission.bind(this);
        this.pushNotification = this.pushNotification.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({[name]: value});
    }

    validateSubmission(e) {
        // Validate form fields on form submission before api call.
        e.preventDefault();

        let goodForSubmit = true;

        const emailValidation = validate.emailValidate(this.state.email);
        goodForSubmit = goodForSubmit && emailValidation.valid;

        this.setState({
            emailError: {
                erroneous: !emailValidation.valid,
                message: [emailValidation.message]
            }
        });

        const passwordValidation = validate.passwordValidate(this.state.password);
        goodForSubmit = goodForSubmit && passwordValidation.valid;

        this.setState({
            passwordError: {
                erroneous: !passwordValidation.valid,
                message: [passwordValidation.message]
            }
        });

        const usernameValidation = validate.usernameValidate(this.state.username);
        goodForSubmit = goodForSubmit && usernameValidation.valid;

        this.setState({
            usernameError: {
                erroneous: !passwordValidation.valid,
                message: [usernameValidation.message]
            }
        });

        if (goodForSubmit) {
            this.handleSubmission();
        }
    }

    handleSubmission() {
        // Actually submit the form.
        const request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            })
        };

        fetch(callAPI('/user/'), request)
            .then(res => res.json())
            .then(
                (response) => {
                    if (response.hasOwnProperty('errors')) {
                        const errors = response.errors;
                        for (let field in errors) {
                            if (errors.hasOwnProperty(field)) {
                                this.setState({
                                    [field + 'Error']: {
                                        erroneous: true,
                                        message: errors[field]
                                    }
                                });
                            }
                        }
                    } else {
                        this.pushNotification('Welcome to modo! Check your inbox for a confirmation link.')
                    }
                }
            )
            .catch((error) => {
                console.log(error);
                this.pushNotification('An error occurred, please try again later.')
            });
    }

    pushNotification(value) {
        // When a notify worthy action is performed, this function triggers
        // the notification component in parent component.
        if (this.props.configNotification) {
            this.props.configNotification(value);
        }
    }

    render() {
        return (
            <form className='gen-form'>
                <FormInput
                    label='Email'
                    name='email'
                    type='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    erroneous={this.state.emailError.erroneous}
                    message={this.state.emailError.message}
                />
                <FormInput
                    label='Username'
                    name='username'
                    type='text'
                    value={this.state.username}
                    onChange={this.handleChange}
                    erroneous={this.state.usernameError.erroneous}
                    message={this.state.usernameError.message}
                />
                <FormInput
                    label='First name'
                    name='firstName'
                    type='text'
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    erroneous={false}
                    message={[]}
                />
                <FormInput
                    label='Last name'
                    name='lastName'
                    type='text'
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    erroneous={false}
                    message={[]}
                />
                <FormInput
                    label='Password'
                    name='password'
                    type='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    erroneous={this.state.passwordError.erroneous}
                    message={this.state.passwordError.message}
                />
                <GenericButton text='Sign up' onClick={this.validateSubmission}/>
            </form>
        );
    }
}

export default SignUpForm;

SignUpForm.propTypes = {
    email: PropTypes.string,
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    configNotification: PropTypes.func
};
