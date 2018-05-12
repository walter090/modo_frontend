import React from 'react';
import PropTypes from 'prop-types';

class GenericButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.onClick}
                    className='gen-btn'
                    id={this.props.id}>
                {this.props.text}
                </button>
        );
    }
}

export default GenericButton;

GenericButton.propTypes = {
    onClick: PropTypes.func,
    id: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string
};
