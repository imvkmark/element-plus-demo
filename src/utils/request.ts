import axios, { AxiosInstance } from 'axios';
import { apiUrl, appVersion, storageKey } from '@/utils/conf';
import { localStore } from '@/utils/utils';
import { forEach, get, keys } from 'lodash-es';
import { Toast } from 'vant';
import { MD5 } from 'crypto-js';
import { mockAll } from '@/mock';

mockAll();

// axios instance, 根据 MOCK 来设置 URL
const instance: AxiosInstance = axios.create({
    baseURL: Boolean(import.meta.env.VITE_MOCK) ? '' : apiUrl,
    timeout: 10000 // 请求超时 20s
});

// 请求前拦截
instance.interceptors.request.use(
    (config) => {
        // 根据你的项目实际情况来对 config 做处理, 这里对 config 不做任何处理，直接返回
        // requestCount为0，才创建loading, 避免重复创建
        if (config && config.headers.isLoading !== false) {
            // showLoading()
        }
        return config;
    },
    (err) => {
        // 判断当前请求是否设置了不显示Loading
        if (err && err.config.headers.isLoading !== false) {
            // hideLoading()
        }
        return Promise.reject(err);
    }
);

// 返回后拦截
instance.interceptors.response.use(
    (res) => {
        // 根据你的项目实际情况来对 response 和 error 做处理 , 这里对 response 和 error 不做任何处理，直接返回
        // 判断当前请求是否设置了不显示Loading
        if (!res || res.config.headers.isLoading !== false) {
            // hideLoading()
        }
        return res;
    },
    (err) => {
        if (err.config.headers.isLoading !== false) {
            // hideLoading()
        }
        if (err.message === 'Network Error') {
            Toast('网络连接异常！')
        }
        if (err.code === 'ECONNABORTED') {
            Toast('请求超时，请重试');
        }
        return Promise.reject(err);
    }
);

type ReqOptions = {
    method?: string,
    url: string,
    params?: any,
    headers?: any
}

/**
 * 加密串生成
 * @param {object} params 请求接口时的参数
 * @param {string} token token字段
 * @returns {string}
 * @private
 */
const requestSign = (params: any, token = '') => {
    let debug = false;
    let kvStr = '';
    let arrKeys = keys(params);
    arrKeys.sort();
    forEach(arrKeys, function (key) {
        if (key !== 'image' && key !== 'file') {
            kvStr += key + '=' + params[key] + ','
        }
    });
    kvStr = kvStr.slice(0, -1);
    let v1Md5 = MD5(MD5(kvStr).toString() + token).toString();
    if (debug) {
        console.log(kvStr, MD5(kvStr).toString(), v1Md5);
    }
    return v1Md5.charAt(1) + v1Md5.charAt(3) + v1Md5.charAt(15) + v1Md5.charAt(31)
};


// 请求方法
const fetch = (options: ReqOptions) => {
    let { method = 'post', params = {}, url, headers = {} } = options;

    let token = localStore(storageKey.TOKEN);
    if (params.token === 'false') {// api.joinRoom 加入房间: 区分首页从聊天室列表卡片(是以游客身份加入)
        token = null;
        delete params.token;
    } else if (params.token) {
        token = params.token;
        delete params.token;
    }

    params.timestamp = Math.round(new Date().getTime() / 1000);
    params.sign = requestSign(params, token ? token : '');
    params.token = token || '';

    // stip : 这里使用 data = {...params, token : token || ''}, 则会丢失form表单的数据

    let xApp = {
        os: 'h5',
        version: appVersion
    }
    switch (method.toLowerCase()) {
        case 'get':
            instance.defaults.headers.get['X-APP'] = JSON.stringify(xApp);
            return instance.get(url, {
                params
            });
        case 'post':
        default:
            instance.defaults.headers.common['Authorization'] = token
                ? `Bearer ${token}`
                : '';
            instance.defaults.headers.common['X-APP'] = JSON.stringify(xApp);
            if (get(headers, 'Content-Type')) {
                instance.defaults.headers.post['Content-Type'] = get(
                    headers,
                    'Content-Type'
                );
            } else {
                instance.defaults.headers.post['Content-Type'] = 'application/json';
            }
            return instance.post(url, params);
        case 'put':
            return instance.put(url, params);
    }
};

export default function request(options: ReqOptions) {
    return fetch(options)
        .then((response) => {
            const { data = {}, status, message } = response.data;
            console.info(options.url, status, message, response.data);
            if (status === 0) {
                /* 请求成功且 状态码为 0
                 * ---------------------------------------- */
                return Promise.resolve({
                    success: true,
                    message: message,
                    status: status,
                    data: data
                });
            } else {
                return Promise.resolve({
                    success: false,
                    status: status,
                    message: message,
                    data: data
                });
            }
        })
        .catch((error) => {
            const { response } = error;
            let msg;
            if (response && response instanceof Object) {
                const { data, statusText, status: code } = response;
                msg = data.message || statusText;

                if (code === 401) {
                    // stip : 全局提醒, 可能需要产品介入
                    Toast.fail('无权访问, 请登录后重试');

                    setTimeout(() => {
                        // 清除token
                        localStore(storageKey.TOKEN, null);
                        // 跳转首页
                        window.location.href = window.location.origin;
                    }, 1500);

                    return Promise.resolve({
                        success: false,
                        status: code,
                        message: '无权访问, 请登录后重试',
                        data: {}
                    });
                }

                if (code === 500) {
                    msg = '错误码 = ' + code + '，请联系管理人员或者是客服人员！';
                } else {
                    msg = '错误码 = ' + code;
                }
                console.error(options.url, code, msg, response);
                return Promise.resolve({
                    success: false,
                    status: code,
                    message: msg,
                    data: {}
                });
            } else {
                msg = error.message || '未知错误(一般是访问超时)';
                console.error(options.url, 520, msg, error);
                return Promise.resolve({
                    success: false,
                    status: 520,
                    message: msg,
                    data: {}
                });
            }
        });
}

