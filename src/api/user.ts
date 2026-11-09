import request from '@/utils/request'
import type {LoginRequest, LoginResponse, RegisterRequest} from "@/types/auth";
import type {Result} from "@/types/request";
//用户注册
export const userRegister = (data: RegisterRequest): Result => {
    return request({
        method: 'post',
        url: '/auth/register',
        data,
    })
}
///用户登录接口开发
export const userLogin = (data: LoginRequest): Result<LoginResponse> => {
    return request({
        method: 'post',
        url: '/auth/login',
        data,
    })
}
