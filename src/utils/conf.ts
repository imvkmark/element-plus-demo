/*
 * 全局配置
 * 文件描述：
 *    主要存放路径及接口相关
 *      iconUrl: 字体文件路径
 *    storageKey: 存入的 storage 的 key
 *      api: 系统接口相关
 */

// 访问接口URL
export const apiUrl: string = String(import.meta.env.VITE_API_URL);

// App 版本号
export const appVersion = String(import.meta.env.DEF_APP_VERSION);

// 存储KEY
export const storageKey = {
    TOKEN: 'token', // token
    USER: 'user' // 用户资料
}