import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/caseList'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/shopList',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/ShopList.vue'),
                    meta: { title: '店铺列表' , permission: true }
                },
                {
                    path: '/salesList',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/SalesList.vue'),
                    meta: { title: '商品列表' , permission: true }
                },
                {
                    path: '/termiRunning',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/TermiRunning.vue'),
                    meta: { title: '终端实时' , permission: false }
                },
                {
                    path: '/salesRunning',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/SalesRunning.vue'),
                    meta: { title: '商品执行列表' , permission: true }
                },
                {
                    path: '/taskList',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/TaskList.vue'),
                    meta: { title: '任务列表' , permission: true }
                },
                {
                    path: '/couponList',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/CouponList.vue'),
                    meta: { title: '领券列表' , permission: true }
                },
                {
                    path: '/addrList',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/AddrList.vue'),
                    meta: { title: '地址列表' , permission: true }
                },
                {
                    path: '/orderList',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/OrderList.vue'),
                    meta: { title: '订单列表' , permission: true }
                },
                {
                    path: '/Running',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Running.vue'),
                    meta: { title: '实时监控台' , permission: true }
                },
                {
                    path: '/caseList',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/CaseList.vue'),
                    meta: { title: '订单导出' , permission: true }
                },
                {
                    path: '/goodsList',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/GoodsList.vue'),
                    meta: { title: '物品导出' , permission: true }
                },
                {
                    path: '/OPorder',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/OPorder.vue'),
                    meta: { title: '手工补订单' , permission: true }
                },
                {
                    path: '/AddrCreate',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/AddrCreate.vue'),
                    meta: { title: '生成地址' , permission: false }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/ReturnAddrByTel',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/ReturnAddrByTel.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/cc',
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
