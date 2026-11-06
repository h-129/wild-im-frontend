import SvgIcon from '@/components/svg-icon/index.vue'
import 'virtual:svg-icons/register'

// 注册svg-icon组件
export function setup(app) {
    app.component('svg-icon', SvgIcon)
}