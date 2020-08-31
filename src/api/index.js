import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export const regionListData = query => {
    return request({
        url: './regionData.json',
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

export const addrTestData = query => {
    return request({
        url: '/api/Addr/Test/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps'),
        method: 'get',
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

//执行中的任务
export const CaseListData = query => {
    return request({
        url: '/api/Order/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/Running",
        method: 'get',
        params: query
    });
};

//导出数据
export const exportOrderData = query => {
    return request({
        url: '/api/Order/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/export",
        method: 'get',
        params: query
    });
};


//coupons
export const CouponsListData = query => {
    return request({
        url: '/api/Coupons/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/all",
        method: 'get',
        params: query
    });
};

export const CouponsSearchData = query => {
    return request({
        url: '/api/Coupons/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/search",
        method: 'get',
        params: query
    });
};

export const CouponsEditData = query => {
    return request({
        url: '/api/Coupons/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps'),
        method: 'put',
        params: query
    });
};

export const CouponsAddData = query => {
    return request({
        url: '/api/Coupons/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps'),
        method: 'post',
        params: query
    });
};

export const CouponsExeData = query => {
    return request({
        url: '/api/Coupons/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/Exe",
        method: 'post',
        params: query
    });
};

//货物接口
export const goodsSearchData = query => {
    return request({
        url: '/api/Goods/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/search",
        method: 'get',
        params: query
    });
};

export const goodsEditData = query => {
    return request({
        url: '/api/Goods/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps'),
        method: 'put',
        params: query
    });
};

export const goodsAddData = query => {
    return request({
        url: '/api/Goods/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps'),
        method: 'post',
        params: query
    });
};

export const getOrderListData = query => {
    return request({
        url: '/api/Order/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/getOrderListByIDs",
        method: 'get',
        params: query
    });
};