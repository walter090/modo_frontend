import React from 'react';
import PropTypes from 'prop-types';

class GenericNotification extends React.Component {
    render() {
        const notificationList = this.props.notification;
        const notificationItems = notificationList.map((notification) =>
            <li key={notification}>{notification}</li>
        );

        return (
            <div className='gen-noti' id={this.props.id}>
                <ul>{notificationItems}</ul>
            </div>
        );
    }
}

export default GenericNotification;

GenericNotification.propTypes = {
    notification: PropTypes.array,
    id: PropTypes.string
};
