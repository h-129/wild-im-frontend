import axios from 'axios';
import type {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import type {Result} from "@/types/request";
import {useUserStore} from "@/store";
import {CacheConstant, HttpConstant} from "@/constants";
// 配置axios请求
const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BASE_URL, //基础地址
    timeout: 5000,//超时时间
}
// 创建axios实例
const request: AxiosInstance = axios.create(config)

//创建请求拦截器
request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        //获取useUserStore中的token
        const token = useUserStore().getToken
        if (token) {
            config.headers[HttpConstant.TOKEN_HEADER] = CacheConstant.TOKEN_HEADER_PREFIX + token
        }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)
// 创建响应拦截器
request.interceptors.response.use(
    (response: AxiosResponse<Result>) => {
        const {code, msg} = response.data
        if (code !== 200) {
            return Promise.reject(new Error(msg || '请求失败'))
        }
        return response.data as any
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)
export default request
