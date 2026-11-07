import {createRouter, createWebHashHistory} from 'vue-router'
import Index from '@/views/index.vue'
import Error from '@/views/error/index.vue'

const routes = [
    {
        path: '/',
        component: Index,
    }, {
        path: '/auth',
        name: 'Auth',
        // 父级布局组件
        component: () => import('@/views/login/AuthLayout.vue'),
        redirect: '/auth/login', // 默认重定向到登录
        children: [
            {
                path: 'login',
                name: 'Login',
                component: () => import('@/views/login/LoginView.vue'),
                meta: {
                    title: '登录',
                }
            },
            {
                path: 'register',
                name: 'Register',
                component: () => import('@/views/login/RegisterView.vue'),
                meta: {
                    title: '注册',
                }
            }
        ]
    }, {
        path: '/:pathMatch(.*)*',
        component: Error,
        meta: {
            title: '404',
        }
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router
