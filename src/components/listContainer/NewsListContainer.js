import React from 'react';

import NewsList from './list/NewsList';
import callAPI from '../../util/apiConfig';
import {connect} from 'react-redux';
import {pushNewsList, getNextCursor} from "../../actions";

class NewsListContainer extends React.Component {
    componentDidMount() {
        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch(callAPI('news'), request)
            .then(res => res.json())
            .then((response) => {
                this.props.pushNewsList(response['results']);
                this.props.getNextCursor(response['next']);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return(
            <NewsList news={this.props.news} next={this.props.next}/>
        );
    }
}

const mapStateToProps = state => ({
    news: state.newsList,
    next: state.next
});

const mapDispatchToProps = dispatch => ({
    pushNewsList: news => dispatch(pushNewsList(news)),
    getNextCursor: next => dispatch(getNextCursor(next))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsListContainer);
