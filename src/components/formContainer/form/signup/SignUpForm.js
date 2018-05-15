import React from 'react';
import PropTypes from 'prop-types';

import validate from '../FormValidation';
import FormInput from '../FormInput';
import './SignUpFrom.css'
import GenericButton from '../../../button/GenericButton';

import callAPI from '../../../../api-config'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: '',
                erroneous: false,
                message: []
            },

            username: {
                value: '',
                erroneous: false,
                message: []
            },

            password: {
                value: '',
                erroneous: false,
                message: []
            },

            firstName: {
                value: '',
                erroneous: false,
                message: []
            },

            lastName: {
                value: '',
                erroneous: false,
                message: []
            },

            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.validateSubmission = this.validateSubmission.bind(this);
        this.pushNotification = this.pushNotification.bind(this);
    }

    handleChange(event) {
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
        // Validate form fields on form submission before api call.
        e.preventDefault();

        this.setState({loading: true});

        let goodForSubmit = true;

        const emailValidation = validate.emailValidate(this.state.email.value);
        goodForSubmit = goodForSubmit && emailValidation.valid;

        this.setState(prev => ({
            email: {
                value: prev.email.value,
                erroneous: !emailValidation.valid,
                message: [emailValidation.message]
            }
        }));

        const passwordValidation = validate.passwordValidate(this.state.password.value);
        goodForSubmit = goodForSubmit && passwordValidation.valid;

        this.setState(prev => ({
            password: {
                value: prev.password.value,
                erroneous: !passwordValidation.valid,
                message: [passwordValidation.message]
            }
        }));

        const usernameValidation = validate.usernameValidate(this.state.username.value);
        goodForSubmit = goodForSubmit && usernameValidation.valid;

        this.setState(prev => ({
            username: {
                value: prev.username.value,
                erroneous: !usernameValidation.valid,
                message: [usernameValidation.message]
            }
        }));

        if (goodForSubmit) {
            this.handleSubmission();
        } else {
            this.setState({loading: false});
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
                email: this.state.email.value,
                username: this.state.username.value,
                password: this.state.password.value
            })
        };

        fetch(callAPI('/user/'), request)
            .then(res => res.json())
            .then(
                (response) => {
                    this.setState({loading: false});
                    if (response.hasOwnProperty('errors')) {
                        const errors = response.errors;
                        for (let field in errors) {
                            if (errors.hasOwnProperty(field)) {
                                console.log(errors[field]);
                                this.setState(prev => ({
                                    [field]: {
                                        value: prev[field].value,
                                        erroneous: true,
                                        message: errors[field]
                                    }
                                }));
                            }
                        }
                    } else {
                        this.pushNotification('Welcome to modo! Check your inbox for a confirmation link.')
                    }
                }
            )
            .catch((error) => {
                this.setState({loading: false});
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
            <form className='gen-form' id='signup-form'>
                <FormInput
                    label='Email'
                    name='email'
                    type='email'
                    value={this.state.email.value}
                    onChange={this.handleChange}
                    erroneous={this.state.email.erroneous}
                    message={this.state.email.message}
                    id='email'
                />
                <FormInput
                    label='Username'
                    name='username'
                    type='text'
                    value={this.state.username.value}
                    onChange={this.handleChange}
                    erroneous={this.state.username.erroneous}
                    message={this.state.username.message}
                    id='username'
                />
                <FormInput
                    label='First name'
                    name='firstName'
                    type='text'
                    value={this.state.firstName.value}
                    onChange={this.handleChange}
                    erroneous={false}
                    message={[]}
                    id='firstName'
                />
                <FormInput
                    label='Last name'
                    name='lastName'
                    type='text'
                    value={this.state.lastName.value}
                    onChange={this.handleChange}
                    erroneous={false}
                    message={[]}
                    id='lastName'
                />
                <FormInput
                    label='Password'
                    name='password'
                    type='password'
                    value={this.state.password.value}
                    onChange={this.handleChange}
                    erroneous={this.state.password.erroneous}
                    message={this.state.password.message}
                    id='password'
                />
                <GenericButton text={this.state.loading ? 'Signing up' : 'Sign up'}
                               loading={this.state.loading}
                               onClick={this.validateSubmission}/>
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
