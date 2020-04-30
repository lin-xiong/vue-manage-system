import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
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
                    meta: { title: '店铺列表' }
                },
                {
                    path: '/taskList',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/TaskList.vue'),
                    meta: { title: '任务列表' }
                },
                {
                    path: '/shopAdd',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/ShopAdd.vue'),
                    meta: { title: '添加店铺' }
                },
                {
                    path: '/OrderList',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/OrderList.vue'),
                    meta: { title: '任务列表' }
                },
                {
                    path: '/OrderAdd',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/OrderAdd.vue'),
                    meta: { title: '添加任务' }
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
