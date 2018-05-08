import React from 'react';
import FormInput from './FormInput';
import './From.css'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: false,
            emailMessage: '',

            username: '',
            usernameError: false,
            usernameMessage: '',

            password: '',
            passwordError: false,
            passwordMessage: '',

            passwordConfirmation: '',

            firstName: '',
            lastName: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form>
                <FormInput
                    label='Email'
                    name='email'
                    type='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    erroneous={this.state.emailError}
                    message={this.state.emailMessage}
                />
                <FormInput
                    label='Username'
                    name='username'
                    type='text'
                    value={this.state.username}
                    onChange={this.handleChange}
                    erroneous={this.state.usernameError}
                    message={this.state.usernameMessage}
                />
                <FormInput
                    label='First name'
                    name='firstName'
                    type='text'
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    erroneous={false}
                    message=''
                />
                <FormInput
                    label='Last name'
                    name='lastName'
                    type='text'
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    erroneous={false}
                    message=''
                />
                <FormInput
                    label='Username'
                    name='username'
                    type='text'
                    value={this.state.username}
                    onChange={this.handleChange}
                    erroneous={this.state.usernameError}
                    message={this.state.usernameMessage}
                />
                <FormInput
                    label='Password'
                    name='password'
                    type='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    erroneous={this.state.passwordError}
                    message={this.state.passwordMessage}
                />
                <FormInput
                    label='Confirm password'
                    name='passwordConfirmation'
                    type='password'
                    value={this.state.passwordConfirmation}
                    onChange={this.handleChange}
                    erroneous={false}
                    message={this.state.passwordMessage}
                />
            </form>
        );
    }
}

export default SignUpForm;
