export default function callAPI(action) {
    const apiRoot = 'https://ykg4kznvg5.execute-api.us-west-2.amazonaws.com/modo_dev';
    return apiRoot + action;
}