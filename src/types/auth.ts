/**
 * 登录请求参数
 */
export interface LoginRequest {
    username: string;
    password: string;
}

/**
 * 注册请求参数
 */
export interface RegisterRequest {
    username: string;
    nickname: string;
    password: string;
    confirmPassword: string;
}

/**
 * 登录响应参数
 */
export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}