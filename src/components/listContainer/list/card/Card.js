import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

class Card extends React.Component {
    render() {
        const additionalClass = this.props.additionalClass;
        return (
            <div className={'card ' + (additionalClass ? additionalClass : '')}>
                <a href={this.props.articleLink}>
                    <div className='card-heading'>
                        <img src={this.props.imageSource} alt={this.props.cardTitle}/>
                        <div className='title-block'>
                            <h1>{this.props.cardTitle}</h1>
                        </div>
                    </div>
                </a>
                <div className='card-desc'>
                    <p>{this.props.description}</p>
                    <span className='source'>{this.props.site}</span>
                </div>
            </div>
        );
    }
}

export default Card;

Card.propTypes = {
    cardTitle: PropTypes.string,
    additionalClass: PropTypes.string,
    imageSource: PropTypes.string,
    description: PropTypes.string,
    site: PropTypes.string,
    articleLink: PropTypes.string,
};
