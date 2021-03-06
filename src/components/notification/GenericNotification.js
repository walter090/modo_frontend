import React from 'react';
import PropTypes from 'prop-types';

import './GenericNotification.css';

class GenericNotification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: [],
        };

        this.expire = this.expire.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const notificationList = nextProps.notification;
        this.setState(prev => ({
            notification: prev.notification
                .concat([notificationList[notificationList.length - 1]])
        }));
        this.timeouts.push(setTimeout(this.expire, 3000));
    }

    componentDidMount() {
        this.timeouts = []
    }

    componentWillUnmount() {
        this.timeouts.forEach(clearTimeout);
    }

    expire() {
        if (this.state.notification.length) {
            this.setState(prev => ({
                notification: prev.notification.slice(1)
            }));
        }
    }

    render() {
        const additionalClass = this.props.additionalClass;
        const notificationList = this.state.notification;

        if (!notificationList || notificationList.length === 0) {
            return null;
        }

        const notificationItems = notificationList.map((notification, index) =>
            <li key={notification + index}>{notification}</li>
        );

        return (
            <div className={'gen-noti '
            + (additionalClass ? (additionalClass + ' ') : '')}
                 id={this.props.id}>
                <ul>{notificationItems}</ul>
            </div>
        );
    }
}

export default GenericNotification;

GenericNotification.propTypes = {
    notification: PropTypes.array,
    id: PropTypes.string,
    additionalClass: PropTypes.string,
    inactive: PropTypes.bool
};
