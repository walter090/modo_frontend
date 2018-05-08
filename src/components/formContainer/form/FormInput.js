import React from 'react';
import PropTypes from 'prop-types';

import ValidationError from './ValidationError'
import './FormInput.css'

class FormInput extends React.Component {
    render() {
        const name = this.props.name;
        const value = this.props.value;
        const type = this.props.type;
        const label = this.props.label;

        const message = this.props.message;
        const erroneous = this.props.erroneous;

        return (
            <label>
                {label}
                <input
                    name={name}
                    value={value}
                    type={type}
                    onChange={this.props.onChange}
                />
                <ValidationError erroneous={erroneous} message={message}/>
            </label>
        );
    }
}

export default FormInput;

FormInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    message: PropTypes.string,
    erroneous: PropTypes.bool
};
