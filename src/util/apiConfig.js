import urljoin from 'url-join';
import {API_ROOT} from "./configParams";

export default function callAPI(action) {
    let request =  urljoin(API_ROOT, action);
    if (request.charAt(request.length - 1) !== '/') {
        request += '/';
    }

    return request;
}
