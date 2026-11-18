import {defineStore} from "pinia";
import {CacheConstant} from "@/constants";
import {userInfo} from "@/api/user";
import type {UserInfo} from "@/api/user";

export const useUserStore = defineStore("useUserStore", {
    state: () => {
        return {
            token: '',
            userInfo: null as UserInfo | null,
        }
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        getUserInfo(state): UserInfo | null {
            return state.userInfo;
        }
    },
    actions: {
        setToken(token: string) {
            this.token = token;
        },
        setUserInfo(userInfo: UserInfo | null) {
            this.userInfo = userInfo;
        },
        //获取用户信息
        async fetchUserInfo() {
            try {
                const {data} = await userInfo();
                this.setUserInfo(data);
            } catch (e: any) {
                throw new Error(e.message || '获取用户信息失败');
            }
        }
        ,
        clear() {
            this.token = '';
            this.userInfo = null;
        }
    },
    // 开启持久化
    persist: {
        key: CacheConstant.TOKEN_CACHE_KEY,
        storage: localStorage,
        pick: ['token']
    }
})