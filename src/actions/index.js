export const pushNewsList = newsList => ({
    type: 'PUSH_NEWS',
    newsList,
});

export const getNextCursor = next => ({
    type: 'NEXT_CURSOR',
    next
});
