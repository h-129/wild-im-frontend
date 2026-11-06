/**
 * 多语言枚举
 */
export enum AppLocaleEnum {
    ZH_CN = 'zh-CN',
    EN_US = 'en-US',
}

// 导出类型（供 TypeScript 编译时约束参数使用）
export type AppLocaleType = typeof AppLocaleEnum[keyof typeof AppLocaleEnum];
