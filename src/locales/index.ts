import {createI18n} from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'
import {CacheConstant} from "@/constants";
//从本地缓存中获取语言选择
const lang = localStorage.getItem(CacheConstant.LANG_CACHE_KEY) || 'zh-CN'

const i18n = createI18n({
    // 必须设为 false，才能在 Vue 3 的 setup 语法糖中使用 useI18n
    legacy: false,
    // 默认语言（这里可以配合你刚学的 localStorage，从本地读取用户的历史选择）
    locale: lang,
    // 如果当前语言翻译缺失，则兜底回退到该语言
    fallbackLocale: 'zh-CN',
    // 禁用控制台的警告信息（视需求开启）
    silentTranslationWarn: true,
    // 语言包映射
    messages: {
        'zh-CN': zhCN,
        'en-US': enUS
    }
})

export default i18n