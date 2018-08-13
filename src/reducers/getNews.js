export function newsList (state=[], action) {
    switch (action.type) {
        case 'PUSH_NEWS':
            return [...state, ...action.newsList];
        default:
            return state;
    }
}

export function next(state=null, action) {
    switch (action.type) {
        case 'NEXT_CURSOR':
            return action.next;
        default:
            return state;
    }
}
