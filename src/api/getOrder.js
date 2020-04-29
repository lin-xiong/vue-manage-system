import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: '/api/Order/thd123/thd123456/all',
        method: 'get',
        params: query
    });
};
