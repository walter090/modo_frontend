import React from 'react'
import PropTypes from 'prop-types';
import './ValidationError.css'

class ValidationError extends React.Component {
    render() {
        if (!this.props.erroneous) {
            return null;
        }

        const messageList = this.props.message;
        const messageItems = messageList.map((message) =>
            <li key={message}>{message}</li>
        );

        return <ul className='gen-err' id={this.props.id}>{messageItems}</ul>;
    }
}

export default ValidationError;

ValidationError.propTypes = {
    erroneous: PropTypes.bool,
    message: PropTypes.array,
    className: PropTypes.string,
    id: PropTypes.string
};
