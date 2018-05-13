import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCircleNotch from '@fortawesome/fontawesome-free-solid/faCircleNotch'

import './Button.css'

class GenericButton extends React.Component {
    render() {
        const additionalClass = this.props.className;
        const loading = this.props.loading;

        return (
            <button onClick={this.props.onClick}
                    className={'gen-btn '
                    + (loading ? 'loading ' : '')
                    + (additionalClass ? additionalClass : '')}
                    id={this.props.id}>
                <FontAwesomeIcon icon={faCircleNotch}/>
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
