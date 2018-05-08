export function emailValidate(value) {
    const re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const valid = re.test(value.toLowerCase());
    return {
        valid: valid,
        message: 'Please enter a valid email address.'
    };
}

export function passwordConfirm(password, confirm) {
    const valid = (password === confirm || (password === '' || confirm === ''));
    return {
        valid: valid,
        message: 'Passwords do not match.'
    };
}

export function passwordStrength(password) {
    const valid = (password.length >= 8);
    return {
        valid: valid,
        message: 'Your password is not strong enough.'
    };
}

export default {emailValidate, passwordConfirm, passwordStrength};
