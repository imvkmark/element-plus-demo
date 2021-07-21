import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'

// 获取 package 的版本号
import pkgJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
    envDir: './config/',
    plugins: [
        vue(),
        // 按需载入 Vant
        styleImport({
            libs: [
                {
                    libraryName: 'vant',
                    esModule: true,
                    resolveStyle: (name) => `vant/es/${name}/style`
                }
            ]
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src/') // 设置 `@` 指向 `src` 目录
        }
    },
    base: './', // 设置打包路径
    define: {
        'import.meta.env.DEF_APP_VERSION': JSON.stringify(pkgJson.version)
    },
    server: {
        port: 4500, // 设置服务启动端口号
        open: true, // 设置服务启动时是否自动打开浏览器
        cors: true // 允许跨域

        // 设置代理，根据我们项目实际情况配置
        // proxy: {
        //   '/api': {
        //     target: 'http://xxx.xxx.xxx.xxx:x000',
        //     changeOrigin: true,
        //     secure: false,
        //     rewrite: (path) => path.replace('/api/', '/')
        //   }
        // },
    }
})
