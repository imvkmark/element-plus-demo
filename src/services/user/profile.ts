/**
 * 获取用户信息
 */
import request from '@/utils/request';

export async function apiUserProfileInfo() {
    return request({
        url: '/api/user/info'
    });
}