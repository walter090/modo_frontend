export function emailValidate(email) {
    const re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const valid = re.test(email.toLowerCase());
    return {
        valid: valid,
        message: 'Please enter a valid email address.'
    };
}

export function passwordValidate(password) {
    if (password === '') {
        return {
            valid: false,
            message: 'Password is required.'
        };
    } else {
        return passwordStrength(password);
    }
}

export function passwordStrength(password) {
    const valid = password.length >= 8;
    return {
        valid: valid,
        message: 'Your password is not strong enough.'
    };
}

export function usernameValidate(username) {
    return {
        valid: username !== '',
        message: 'Username is required.'
    }
}

export default {emailValidate, passwordValidate, usernameValidate};
