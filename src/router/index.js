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
                    path: '/taskList',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/TaskList.vue'),
                    meta: { title: '任务列表' , permission: true }
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
                    path: '/caseList',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/CaseList.vue'),
                    meta: { title: '实时执行表' , permission: true }
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
            path: '*',
            redirect: '/404'
        }
    ]
});
