import vue from '@vitejs/plugin-vue'
import {defineConfig} from 'vite'
import {fileURLToPath} from "node:url";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
import tailwindcss from '@tailwindcss/vite'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons-ng'
import * as path from "node:path";
// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(),
        AutoImport({
            imports: ['vue', 'vue-router'], // 自动导入 vue 和 vue-router 的 api (如 ref, watch, useRouter)
            dts: 'src/auto-imports.d.ts',   // 自动生成 TS 声明文件
        }),
        Components({
            resolvers: [
                AntDesignVueResolver({
                    // 极其重要：Ant Design Vue 4.x 已经全面改用 CSS-in-JS
                    // 这里必须设置为 false，否则启动会报错找不到 less/css 样式文件
                    importStyle: false,
                })
            ],
            dts: 'src/components.d.ts',     // 自动生成 TS 声明文件
        }),
        tailwindcss(), // 配置 tailwindcss 插件
        createSvgIconsPlugin({
            iconDirs: [path.resolve(import.meta.dirname, 'src/assets/icons')], // 图标文件夹
            symbolId: '[name]', // 图标符号 ID 格式
        })
    ],
    resolve: {
        // 配置路径别名
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        port: 3241,// 服务端端口
        open: true,// 自动打开浏览器
        host: '0.0.0.0',// 开启外部访问
        hmr: true, // 开启热更新
        // 配置代理
        proxy: {
            '/api': {
                target: 'http://localhost:8191/api',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})
