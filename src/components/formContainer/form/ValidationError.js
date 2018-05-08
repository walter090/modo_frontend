import React from 'react'
import PropTypes from 'prop-types';
import './ValidationError.css'

class ValidationError extends React.Component {
    render() {
        if (!this.props.erroneous) {
            return null;
        }

        return (
            <span>{this.props.message}</span>
        );
    }
}

export default ValidationError;

ValidationError.propTypes = {
    erroneous: PropTypes.bool,
    message: PropTypes.string
};
