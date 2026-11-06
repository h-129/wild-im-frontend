import {createApp} from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue'
import router from '@/router/index'
import './assets/styles/tailwind.css'
import {setup as setupPlugins} from './plugins/index'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import i18n from './locales' //引入i18n实例

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(router) // 注册路由
app.use(pinia) // 注册pinia
app.use(Antd) // 注册ant-design-vue
setupPlugins(app) // 注册所有插件
app.use(i18n) // 注册i18n实例
app.mount('#app')
