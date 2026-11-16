import router from '@/router/index';
import {showFullLoading, hideFullLoading} from '@/utils/loading';
import {useUserStore} from '@/store';

const whiteList = ['/auth/login', '/auth/register'];
router.beforeEach(async (to, from, next) => {
    showFullLoading();
    document.title = (to.meta?.title as string) || import.meta.env.VITE_TITLE;

    const userStore = useUserStore();
    const token = userStore.getToken;

    // 1. 白名单页面直接放行
    if (whiteList.includes(to.path)) {
        return token ? next({path: '/'}) : next();
    }

    // 2. 未登录直接重定向到登录页
    if (!token) {
        hideFullLoading();
        return next({path: '/auth/login', query: {redirect: to.fullPath}});
    }

    // 3. 已登录，但如果 Pinia 里还没有 userInfo（比如刷新页面后），则补救拉取一次
    if (!userStore.getUserInfo) {
        try {
            await userStore.fetchUserInfo();
        } catch (error) {
            userStore.clear();
            hideFullLoading();
            return next({path: '/auth/login', query: {redirect: to.fullPath}});
        }
    }

    next();
});

router.afterEach(() => {
    hideFullLoading();
});