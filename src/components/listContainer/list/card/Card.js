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
        Card.strip = Card.strip.bind(this);
    }

    pullDesc() {
        this.setState({height: 'auto'});
    }

    hideDesc() {
        this.setState({height: 0});
    }

    static strip(html) {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    render() {
        const additionalClass = this.props.additionalClass;
        const articleLink = this.props.articleLink;
        const imageSource = this.props.imageSource;
        const cardTitle = this.props.cardTitle;
        const sourceLink = this.props.sourceLink;
        const site = this.props.site;
        const description = this.props.description;

        return (
            <div className={'card ' + (additionalClass ? additionalClass : '')}
                 onMouseEnter={this.pullDesc}
                 onMouseLeave={this.hideDesc}>
                <div className='card-heading'>
                    <a href={articleLink}>
                        <img src={imageSource} alt={cardTitle}/>
                    </a>
                    <div className='title-block'>
                        <img className='glass'
                             src={imageSource}
                             alt={cardTitle}/>
                        <a className='source' href={sourceLink}>{site}</a>
                        <a className='title-link' href={articleLink}>{Card.strip(cardTitle)}</a>
                        <AnimateHeight duration={300}
                                       easing='ease'
                                       height={this.state.height}>
                            <p>{description}</p>
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
