import {combineReducers} from 'redux';
import {newsList, next} from "./getNews";

export default combineReducers({
    newsList,
    next
});
