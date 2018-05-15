export function emailValidate(email) {
    const re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const valid = re.test(email.toLowerCase());
    return {
        valid: valid,
        message: 'Please enter a valid email address.'
    };
}

export function passwordValidate(password) {
    if (password === '' || password === undefined) {
        return {
            valid: false,
            message: 'Password is required.'
        };
    } else {
        return passwordStrength(password);
    }
}

export function passwordFilled(password) {
    return {
        valid: !(password === '' || password === undefined),
        message: 'Password is required.'
    };
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
        valid: username !== '' || username === undefined,
        message: 'Username is required.'
    }
}

export default {emailValidate, passwordValidate, usernameValidate, passwordFilled};
