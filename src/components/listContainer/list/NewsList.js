import React from 'react';
import PropTypes from 'prop-types';

import Card from './card/Card';
import FrostedGlassFilter from './card/FrostedGlassFilter';

class NewsList extends React.Component {
    render() {
        const news = this.props.news;
        const next = this.props.next;

        return (
            <div className='news-list'>
                {news.map(article =>
                    <Card cardTitle={article.title}
                          imageSource={article.images}
                          sourceLink={article.domain}
                          articleLink={article.url}
                          description={article.description}
                          site={article.site_name}/>
                )}
                <FrostedGlassFilter/>
            </div>
        );
    }
}

export default NewsList;

NewsList.propTypes = {
    news: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        images: PropTypes.string,
        site_name: PropTypes.string,
        domain: PropTypes.string,
        url: PropTypes.string,
        description: PropTypes.string,
    })),
};
