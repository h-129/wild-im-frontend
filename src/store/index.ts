import {defineStore} from "pinia";
import {CacheConstant} from "@/constants";

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
        },
        clearToken() {
            this.token = '';
        }
    },
    // 开启持久化
    persist: {
        key: CacheConstant.TOKEN_CACHE_KEY,
        storage: localStorage,
        pick: ['token']
    }
})