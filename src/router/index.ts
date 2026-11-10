import {createRouter, createWebHashHistory} from 'vue-router'
import Error from '@/views/error/index.vue'
import Main from '@/layout/main/index.vue'
import Chat from '@/views/chat/index.vue'
import Contact from '@/views/contact/index.vue'

const routes = [
    {
        path: '/',
        component: Main,
        redirect: '/chat/index',
        children: [
            {
                path: '/chat/index',
                component: Chat,
                meta: {
                    title: '聊天'
                }
            },
            {
                path: '/contact/index',
                component: Contact,
                meta: {
                    title: '联系人'
                }
            }
        ]
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
