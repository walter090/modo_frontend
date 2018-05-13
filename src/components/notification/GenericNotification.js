import React from 'react';
import PropTypes from 'prop-types';

class GenericNotification extends React.Component {
    render() {
        if (!this.props.notification) {
            return null;
        }

        const additionalClass = this.props.additionalClass;
        const notificationList = this.props.notification;

        const notificationItems = notificationList.map((notification) =>
            <li key={notification}>{notification}</li>
        );

        return (
            <div className={'gen-noti ' + (additionalClass ? additionalClass : '')} id={this.props.id}>
                <ul>{notificationItems}</ul>
            </div>
        );
    }
}

export default GenericNotification;

GenericNotification.propTypes = {
    notification: PropTypes.array,
    id: PropTypes.string,
    additionalClass: PropTypes.string
};
