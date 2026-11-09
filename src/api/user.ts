import request from '@/utils/request'
import type {RegisterRequest} from "@/types/auth";
import type {Result} from "@/types/request";
//用户注册
export const userRegister = (data: RegisterRequest): Result => {
    return request({
        method: 'post',
        url: '/auth/register',
        data,
    })
}
