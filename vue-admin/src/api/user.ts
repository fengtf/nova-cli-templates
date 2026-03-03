import request from '@/utils/request'
import { userTypes } from '@/types'

// 获取token
export function getToken(data: userTypes.AuthCallbackParam) {
  return request({
    url: '/api/get_token',
    method: 'POST', // 确保method是大写的
    data: data
  })
}

// 获取用户信息
export function getUserInfo() {
  return request<userTypes.UserInfo>({
    url: '/api/user/info',
    method: 'GET'
  })
}