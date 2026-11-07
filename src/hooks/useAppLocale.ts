import {useI18n} from 'vue-i18n'
import {CacheConstant} from '@/constants'
import type {AppLocaleType} from '@/enums/appEnums'

export function useAppLocale() {
    const {t, locale} = useI18n()
// 包装一下，强制将其暴露出枚举类型
    const currentLocale = computed({
        get: () => locale.value as AppLocaleEnum,
        set: (val: AppLocaleEnum) => {
            locale.value = val
        }
    })
    const switchLanguage = (targetLang: AppLocaleType) => {
        currentLocale.value = targetLang
        localStorage.setItem(CacheConstant.LANG_CACHE_KEY, targetLang)
    }
    return {
        t,              // 暴露翻译函数
        locale: currentLocale,         // 暴露当前语言状态
        switchLanguage  // 暴露封装好的切换函数
    }
}