import {CacheConstant} from "@/constants";

export const expireStorage = {
    setItem(key: string, value: string) {
        const expire = Date.now() + CacheConstant.TOKEN_CACHE_EXPIRE_TIME;
        const data = JSON.stringify({value, expire});
        localStorage.setItem(key, data);
    },
    getItem(key: string) {
        const dataStr = localStorage.getItem(key);
        if (!dataStr) return null;
        try {
            const data = JSON.parse(dataStr);
            if (data.expire && data.expire < Date.now()) {
                localStorage.removeItem(key);
                return null;
            }
            // 直接原封不动地把字符串还给 Pinia
            return data.value;
        } catch (e) {
            return null;
        }
    }
}