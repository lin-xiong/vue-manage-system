import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};


export const loginData = query => {
    return request({
        url: '/api/login',
        method: 'post',
        params: query
    });
};

//shop
export const addShopData = query => {
    return request({
        url: '/api/Shop/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps'),
        method: 'post',
        params: query
    });
};

export const shopListData = query => {
    return request({
        url: '/api/Shop/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/all",
        method: 'get',
        params: query
    });
};

export const shopSearchData = query => {
    return request({
        url: '/api/Shop/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/search",
        method: 'get',
        params: query
    });
};

export const shopEditData = query => {
    return request({
        url: '/api/Shop/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps'),
        method: 'put',
        params: query
    });
};

export const shopAddData = query => {
    return request({
        url: '/api/Shop/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps'),
        method: 'post',
        params: query
    });
};

//task
export const taskListData = query => {
    return request({
        url: '/api/Task/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/all",
        method: 'get',
        params: query
    });
};

export const taskSearchData = query => {
    return request({
        url: '/api/Task/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/search",
        method: 'get',
        params: query
    });
};

export const taskEditData = query => {
    return request({
        url: '/api/Task/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps'),
        method: 'put',
        params: query
    });
};

export const taskAddData = query => {
    return request({
        url: '/api/Task/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps'),
        method: 'post',
        params: query
    });
};

export const taskExeData = query => {
    return request({
        url: '/api/Task/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/Exe",
        method: 'post',
        params: query
    });
};

//addr
export const addrListData = query => {
    return request({
        url: '/api/Addr/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/all",
        method: 'get',
        params: query
    });
};

export const addrSearchData = query => {
    return request({
        url: '/api/Addr/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/search",
        method: 'get',
        params: query
    });
};

export const addrEditData = query => {
    return request({
        url: '/api/Addr/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps'),
        method: 'put',
        params: query
    });
};

export const addrAddData = query => {
    return request({
        url: '/api/Addr/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps'),
        method: 'post',
        params: query
    });
};

//order
export const orderListData = query => {
    return request({
        url: '/api/Order/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/all",
        method: 'get',
        params: query
    });
};

export const orderSearchData = query => {
    return request({
        url: '/api/Order/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/search",
        method: 'get',
        params: query
    });
};

export const orderEditData = query => {
    return request({
        url: '/api/Order/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps'),
        method: 'put',
        params: query
    });
};

export const orderAddData = query => {
    return request({
        url: '/api/Order/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps'),
        method: 'post',
        params: query
    });
};