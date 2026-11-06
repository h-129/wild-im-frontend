import {defineStore} from "pinia";
import {CacheConstant} from "@/constants";
import {expireStorage} from "@/utils/storage";

export const useUserStore = defineStore("useUserStore", {
    state: () => {
        return {
            token: '',
        }
    },
    getters: {
        getToken(state) {
            return state.token;
        }
    },
    actions: {
        setToken(token: string) {
            this.token = token;
        }
    },
    // 开启持久化
    persist: {
        key: CacheConstant.TOKEN_CACHE_KEY,
        storage: expireStorage,
        pick: ['token']
    }
})