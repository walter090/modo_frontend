import React from 'react';

class GenericButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}

export default GenericButton;
