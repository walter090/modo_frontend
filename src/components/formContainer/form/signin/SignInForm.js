import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

import FormInput from '../FormInput';
import FormValidation from '../FormValidation';
import GenericButton from '../../../clickable/GenericButton';
import {Link} from 'react-router-dom';
import callAPI from "../../../../util/apiConfig";
import './SignInFrom.css'

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

        this.setState({loading: true});

        let goodForSubmit = true;

        const emailValidation = FormValidation.emailValidate(this.state.email.value);
        goodForSubmit = goodForSubmit && emailValidation.valid;

        this.setState(prev => ({
            email: {
                value: prev.email.value,
                erroneous: !emailValidation.valid,
                message: [emailValidation.message]
            }
        }));

        const passwordValidation = FormValidation.passwordFilled(this.state.password.value);
        goodForSubmit = goodForSubmit && passwordValidation.valid;

        this.setState(prev => ({
            password: {
                value: prev.password.value,
                erroneous: !passwordValidation.valid,
                message: [passwordValidation.message]
            }
        }));

        if (goodForSubmit) {
            this.handleSubmission();
        } else {
            this.setState({loading: false});
        }
    }

    handleSubmission() {
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.email.value,
                password: this.state.password.value,
                client_id: 'GqksfoPENlvKRtMhXcNLdwcqCbQkWjHyOPk66xfn',
                grant_type: 'password'
            })
        };

        fetch(callAPI('/auth/token/'), request)
            .then(res => {
                if (res.status === 401) {
                    this.setState(prev => ({
                        password: {
                            value: prev.password.value,
                            erroneous: true,
                            message: ['Email or password is not correct.']
                        },
                        email: {
                            value: prev.email.value,
                            erroneous: true,
                            message: []
                        }
                    }));
                }
                return res.json();
            })
            .then(
                (response) => {
                    this.setState({loading: false});
                    if (response.hasOwnProperty('errors') || response.hasOwnProperty('error')) {
                        const errors = response.errors;
                        for (let field in errors) {
                            if (errors.hasOwnProperty(field)) {
                                console.log(errors[field]);
                                this.setState(prev => ({
                                    [field]: {
                                        value: prev[field].value,
                                        erroneous: true,
                                        message: prev[field].message
                                    }
                                }));
                            }
                        }
                    } else {
                        const cookies = new Cookies();

                        Date.prototype.addDays = function (days) {
                            let dat = new Date();
                            dat.setDate(dat.getDate() + days);
                            return dat;
                        };

                        cookies.set(
                            'accessToken',
                            response['access_token'],
                            {
                                // Expires in 1 day.
                                maxAge: 86400
                            }
                        );
                        cookies.set(
                            'accessTokenExpires',
                            new Date().addDays(1)
                        );
                        cookies.set(
                            'refreshToken',
                            response['refresh_token'],
                            {
                                // Expires in 1 week.
                                maxAge: 604800
                            }
                        );
                        cookies.set(
                            'refreshTokenExpires',
                            new Date().addDays(7)
                        );
                        cookies.set(
                            'tokenType',
                            response['token_type']
                        );
                        this.pushNotification('You are signed in.');
                    }
                }
            )
            .catch((error) => {
                this.setState({loading: false});
                console.log(error);
                this.pushNotification('An error occurred, please try again later.');
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
                <GenericButton text={this.state.loading ? 'Signing in' : 'Sign in'}
                               loading={this.state.loading}
                               onClick={this.validateSubmission}/>

                <Link className='signin-link' to='/sign-up/'>New here? Sign up</Link>
            </form>
        );
    }
}

export default SignInForm;

SignInForm.propTypes = {
    configNotification: PropTypes.func
};
