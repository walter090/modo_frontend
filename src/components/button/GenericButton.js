import React from 'react';
import PropTypes from 'prop-types';

import './Button.css'

class GenericButton extends React.Component {
    render() {
        const additionalClass = this.props.className;

        return (
            <button onClick={this.props.onClick}
                    className={'gen-btn ' + (additionalClass ? '': additionalClass)}
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
