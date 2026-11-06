import {createRouter, createWebHashHistory} from 'vue-router'
import Index from '@/views/index.vue'
import Login from '@/views/login/index.vue'
import Error from '@/views/error/index.vue'

const routes = [
    {
        path: '/',
        component: Index,
    }, {
        path: '/login',
        component: Login,
        meta: {
            title: '登录',
        }
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
