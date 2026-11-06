/**
 * 缓存相关常量类
 */
export const CacheConstant = {
    //token缓存key
    TOKEN_CACHE_KEY: "ACCESS_TOKEN_KEY",
    //token缓存过期时间，5小时
    TOKEN_CACHE_EXPIRE_TIME: 60 * 60 * 5 * 1000,
    // 语言缓存 key
    LANG_CACHE_KEY: "APP_LANGUAGE",
} as const; // 常量类，防止被修改