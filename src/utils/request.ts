import axios, { AxiosInstance } from 'axios';
import { appUrl, appVersion, storageKey } from '@/utils/conf';
import { localStore } from '@/utils/utils';
import { each, forEach, get, isNaN, isNil, isObject, keys, set, trim } from 'lodash-es';
import { MD5 } from 'crypto-js';
import { ElMessage } from 'element-plus'
import { usePoppyStore } from "@/store/poppy";

// axios instance, 根据 MOCK 来设置 URL
// 拦截器可以查看 : https://axios-http.com/zh/docs/interceptors
const instance: AxiosInstance = axios.create({
    baseURL: appUrl,
    timeout: 20000 // 请求超时 20s
});


const poppyStore = usePoppyStore();

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
            if (isObject(params[key])) {
                kvStr += key + '=' + JSON.stringify(params[key]) + ','
            } else {
                kvStr += key + '=' + params[key] + ','
            }
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
const fetch = (options: any) => {
    let { method = 'post', params: oriParams = {}, url, headers = {}, from = 'app' } = options;

    let params: any;
    if (oriParams instanceof FormData) {
        params = new FormData();
        for (let pair of oriParams.entries()) {
            if (isNil(pair[1])) {
                return;
            }
            if (isNaN(pair[1])) {
                return;
            }
            let sv = pair[1];
            if (typeof pair[1] === 'string') {
                sv = trim(pair[1]);
            }
            params.append(pair[0], sv);
        }
    } else {
        params = {};
        each(oriParams, function (val, key) {
            if (isNil(val)) {
                return;
            }
            if (isNaN(val)) {
                return;
            }
            let sv = val;
            if (typeof val === 'string') {
                sv = trim(val);
            }
            set(params, key, sv);
        })
    }


    let token = localStore(storageKey.TOKEN);
    set(params, 'timestamp', Math.round(new Date().getTime() / 1000));
    set(params, 'sign', requestSign(params, token ? token : ''));

    console.info(options.url, params);
    // stip : 这里使用 data = {...params, token : token || ''}, 则会丢失form表单的数据

    let xApp = {
        os: 'h5',
        version: appVersion
    }
    switch (method.toLowerCase()) {
        case 'get':
            set(params, 'token', token ? token : '');
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

export default function request(options: any) {
    return fetch(options)
        .then((response) => {
            poppyStore.Loaded();
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
            poppyStore.Loaded();
            const { response } = error;
            let msg;
            if (response && response instanceof Object) {
                const { data, statusText, status: code } = response;
                msg = data.message || statusText;

                if (code === 401) {
                    poppyStore.Logout();

                    ElMessage.warning('无权访问, 请登录后重试');

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
                ElMessage.error(msg);
                console.error(options.url, code, msg, response, error.toJSON());
                return Promise.resolve({
                    success: false,
                    status: code,
                    message: msg,
                    data: {}
                });
            } else {
                msg = error.message || '未知错误(一般是访问超时)';
                if (error.name === 'Error') {
                    if (error.code === 'ECONNABORTED') {
                        if (get(error, 'config.data') instanceof FormData) {
                            msg = '上传超时，请检查网络或压缩图片上传';
                        } else {
                            msg = '请求超时，请检查网络或重试';
                        }
                    }
                    if (error.message === 'Network Error') {
                        msg = '网络连接异常！';
                    }
                }
                ElMessage.error(msg);
                console.error(options.url, 520, msg, error.toJSON());
                return Promise.resolve({
                    success: false,
                    status: 520,
                    message: msg,
                    data: {}
                });
            }
        });
}

