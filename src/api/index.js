import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const regionListData = query => {
    return request({
        url: './regionData.json',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const taskTypeListData = query => {
    return request({
        url: './taskType.json',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const loginData = query => {
    return request({
        url: '/api/login',
        method: 'post',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

//shop
export const addShopData = query => {
    return request({
        url: '/api/Shop/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/',
        method: 'post',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const shopListData = query => {
    return request({
        url: '/api/Shop/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/all',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const shopSearchData = query => {
    return request({
        url: '/api/Shop/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/search',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const shopGetstatusData = query => {
    return request({
        url: '/api/Shop/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/getstatus',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const shopEditData = query => {
    return request({
        url: '/api/Shop/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/',
        method: 'put',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const shopAddData = query => {
    return request({
        url: '/api/Shop/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/',
        method: 'post',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

//sales
export const salesListData = query => {
    return request({
        url: '/api/sales/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/all',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const salesSearchData = query => {
    return request({
        url: '/api/sales/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/search',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const salesEditData = query => {
    return request({
        url: '/api/sales/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/',
        method: 'put',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const salesAddData = query => {
    //alert(query[0].title);
    return request({
        url: '/api/sales/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/',
        method: 'post',
        headers:{
            'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0",
            'Content-Type': 'application/json'
        },
        data: query
    });
};

export const salesFileData = query => {
    return request({
        url: '/api/sales/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/',
        method: 'post',
        headers:{
            'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0",
            'Content-Type': 'multipart/form-data'
        },
        params: query
    });
};
//执行中的任务
export const SalesRunningListData = query => {
    return request({
        url: '/api/SalesRunning/all/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

//task
export const taskListData = query => {
    return request({
        url: '/api/Task/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/all',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const taskSearchData = query => {
    return request({
        url: '/api/Task/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/search',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const taskEditData = query => {
    return request({
        url: '/api/Task/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/',
        method: 'put',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const taskAddData = query => {
    return request({
        url: '/api/Task/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/',
        method: 'post',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const taskExeData = query => {
    return request({
        url: '/api/Task/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/Exe',
        method: 'post',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const refreshOrderData = query => {
    return request({
        url: '/api/Task/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/refresh',
        method: 'post',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

//addr
export const addrListData = query => {
    return request({
        url: '/api/Addr/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/all',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const addrSearchData = query => {
    return request({
        url: '/api/Addr/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/search',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const addrEditData = query => {
    return request({
        url: '/api/Addr/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/',
        method: 'put',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const addrAddData = query => {
    return request({
        url: '/api/Addr/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+'/',
        method: 'post',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const addrTestData = query => {
    return request({
        url: '/api/Addr/Test/',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const createAddrData = query => {
    return request({
        url: '/api/Addr/Create/',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

//order
export const orderListData = query => {
    return request({
        url: '/api/Order/all',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const orderSearchData = query => {
    return request({
        url: '/api/Order/search',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const orderEditData = query => {
    return request({
        url: '/api/Order/',
        method: 'put',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const orderAddData = query => {
    return request({
        url: '/api/Order/',
        method: 'post',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

//执行中的任务
export const CaseListData = query => {
    return request({
        url: '/api/Order/Running',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

//导出数据
export const exportOrderData = query => {
    return request({
        url: '/api/Order/export',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};


//coupons
export const CouponsListData = query => {
    return request({
        url: '/api/Coupons/all',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const CouponsSearchData = query => {
    return request({
        url: '/api/Coupons/search',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const CouponsEditData = query => {
    return request({
        url: '/api/Coupons/',
        method: 'put',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const CouponsAddData = query => {
    return request({
        url: '/api/Coupons/',
        method: 'post',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const CouponsExeData = query => {
    return request({
        url: '/api/Coupons/Exe',
        method: 'post',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

//货物接口
export const goodsSearchData = query => {
    return request({
        url: '/api/Goods/search',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const goodsEditData = query => {
    return request({
        url: '/api/Goods/',
        method: 'put',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const goodsAddData = query => {
    return request({
        url: '/api/Goods/',
        method: 'post',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

export const getOrderListData = query => {
    return request({
        url: '/api/Order/getOrderListByIDs',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};

//补单接口
export const OPorderListData = query => {
    return request({
        url: '/api/OPorder/',
        method: 'get',
        headers:{'X-User-Agent':'Supervisor/'+localStorage.getItem('ms_username')+"/"+localStorage.getItem('ms_ps')+"/1.0"},
        params: query
    });
};