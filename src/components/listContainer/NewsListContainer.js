import React from 'react';

import NewsList from 'list/NewsList';
import callAPI from '../../util/api-config';

class NewsListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            next: ''
        }
    }

    componentDidMount() {
        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch(callAPI(/news/), request)
            .then(res => res.json())
            .then((response) => {
                this.setState({
                    next: response['next'],
                    news: response['results']
                })
            })
    }

    render() {
        return(
            <NewsList news={this.state.news} next={this.state.next}/>
        );
    }
}

export default NewsListContainer;
