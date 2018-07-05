import React from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';

import './Card.css';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0
        };

        this.pullDesc = this.pullDesc.bind(this);
        this.hideDesc = this.hideDesc.bind(this);
    }

    pullDesc() {
        this.setState({height: 'auto'});
    }

    hideDesc() {
        this.setState({height: 0});
    }

    render() {
        const additionalClass = this.props.additionalClass;
        return (
            <div className={'card ' + (additionalClass ? additionalClass : '')}
                 onMouseEnter={this.pullDesc}
                 onMouseLeave={this.hideDesc}>
                <div className='card-heading'>
                    <a href={this.props.articleLink}>
                        <img src={this.props.imageSource} alt={this.props.cardTitle}/>
                    </a>
                    <div className='title-block'>
                        <img className='glass'
                             src={this.props.imageSource}
                             alt={this.props.cardTitle}/>
                        <a className='source' href={this.props.sourceLink}>{this.props.site}</a>
                        <a className='title-link' href={this.props.articleLink}>{this.props.cardTitle}</a>
                        <AnimateHeight duration={300}
                                       easing='ease'
                                       height={this.state.height}
                                       animateOpacity={true}>
                            <p>{this.props.description}</p>
                        </AnimateHeight>
                    </div>
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
    sourceLink: PropTypes.string,
};
