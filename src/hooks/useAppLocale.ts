import {useI18n} from 'vue-i18n'
import {CacheConstant} from '@/constants'
import type {AppLocaleType} from '@/enums/appEnums'

export function useAppLocale() {
    const {t, locale} = useI18n()

    const switchLanguage = (targetLang: AppLocaleType) => {
        locale.value = targetLang
        localStorage.setItem(CacheConstant.LANG_CACHE_KEY, targetLang)
    }

    return {
        t,              // 暴露翻译函数
        locale,         // 暴露当前语言状态
        switchLanguage  // 暴露封装好的切换函数
    }
}