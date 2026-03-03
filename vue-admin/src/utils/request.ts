import axios from 'axios'
import type { AxiosInstance } from 'axios'
import JSONbig from 'json-bigint'
import { ElMessage } from 'element-plus'
import { getToken, removeToken, removeIdToken } from '@/utils/auth'
import { login_url, isMockMode } from '@/utils/utils'
// Mock 数据映射
import { mockDataMap } from '@/mock/mapping'

// 创建axios实例
const service: AxiosInstance = axios.create({
  transformResponse: [function(data) {
    // Do whatever you want to transform the data
    return JSONbig.parse(data)
  }],
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000 *3,
  withCredentials: true
})

// 请求错误处理
const requestError = (error: any) => {
  // 检查是否是mock请求错误
  if (error.name === 'MOCK_REQUEST') {
    // 对于mock请求，返回一个模拟的响应对象
    return Promise.resolve({
      data: error.mockData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      request: {}
    })
  }

  ElMessage({
    message: error.response?.data?.message || error,
    type: 'error',
    duration: 2 * 1000,
    offset: 120
  })
  return Promise.reject(error)
}

// 请求拦截器
const beforeRequest = (config: any) => {
  // 确保config对象完整
  if (!config.method) {
    config.method = 'GET' // 设置默认method
  }
  if (!config.headers) {
    config.headers = {}
  }
  
  // 检查是否需要返回mock数据
  const mockKey = `${config.method.toUpperCase()}:${config.url}`
  if (isMockMode() && config.url && mockDataMap[mockKey]) {
    console.log('发现mock请求:', mockKey, mockDataMap[mockKey])
    // 对于mock请求，直接抛出一个特殊的错误，在响应拦截器中捕获
    const mockError = new Error('MOCK_REQUEST')
    mockError.name = 'MOCK_REQUEST'
    ;(mockError as any).mockData = mockDataMap[mockKey]
    throw mockError
  }
  
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/vnd.vtg.v1+json'
  if (getToken()) {
    config.headers['Authorization'] = `Bearer ${getToken()}`
  }
  return config
}

// 响应拦截器
const beforeResponse = (res: any) => {
  // 确保res和res.data存在
  if (!res || !res.data) {
    console.error('响应数据格式错误:', res)
    return res
  }
  
  if (res.config.url.includes('/api/get_token')) {
    return res.data
  }

  if (getToken()) {
    // 处理认证失败的情况 
    // 100000 -> 未找到用户
    if ([403, 100000].includes(res.data.code)) {
      removeToken()
      removeIdToken()
      redirectForLogin()
      return false
    }
    // 10012 -> 网盘授权失败
    if (res.data.code !== 0 && res.data.code !== 10012) {
      if(res.data.code === 10009 && res.data.message.include('Order')){
        ElMessage({
          message: '支付与账单服务暂不可用',
          type: 'error',
          duration: 1500,
          offset: 120
        })
        return false;
      }
      ElMessage({
        message: res.data.message || res.data.msg,
        type: 'error',
        duration: 1500,
        offset: 120
      })
      return false
    }
    return res.data
  }
  // 其他情况都跳转授权
  redirectForLogin()
}

export function redirectForLogin() {
  window.location.href = login_url()
}

// 注册拦截器
service.interceptors.request.use(beforeRequest, requestError)
service.interceptors.response.use(beforeResponse, requestError)

export default service 