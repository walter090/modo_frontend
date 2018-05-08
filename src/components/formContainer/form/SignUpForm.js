import React from 'react';
import FormInput from './FormInput';
import './From.css'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            passwordConfirmation: '',
            firstName: '',
            lastName: '',

            erroneous: {
                email: false,
                username: false,
                password: false
            },
            errorMessage: {
                email: '',
                username: '',
                password: ''
            }
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
                    erroneous={this.state.erroneous.email}
                    message={this.state.errorMessage.email}
                />
                <FormInput
                    label='Username'
                    name='username'
                    type='text'
                    value={this.state.username}
                    onChange={this.handleChange}
                    erroneous={this.state.erroneous.username}
                    message={this.state.errorMessage.username}
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
                    label='Password'
                    name='password'
                    type='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    erroneous={this.state.erroneous.password}
                    message={this.state.errorMessage.password}
                />
                <FormInput
                    label='Confirm password'
                    name='passwordConfirmation'
                    type='password'
                    value={this.state.passwordConfirmation}
                    onChange={this.handleChange}
                    erroneous={false}
                    message=''
                />
            </form>
        );
    }
}

export default SignUpForm;
