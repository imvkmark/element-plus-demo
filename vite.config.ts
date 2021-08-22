import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> yarn add @types/node -D
import { resolve } from 'path'

// 获取 package 的版本号
import pkgJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
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
        build: {
            // outDir: `./build/${mode}`
            outDir: `./build/vue3`
        },
        base: '/vue3/',
        define: {
            'import.meta.env.DEF_APP_VERSION': JSON.stringify(pkgJson.version)
        },
        server: {
            port: 9241,
            open: true,
            cors: true
        }
    }
});
