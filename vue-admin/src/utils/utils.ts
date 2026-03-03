// src/utils/utils.ts
import config from '@/config/config.json'

// 统一的时间格式化方法
export function formatDate(time: string | Date) {
  if (!time) return '-'
  const date = new Date(time)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

/**
 * 获取当前页面URL参数
 */
export const getUrlParam = (key: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(key)
}

// 获取环境配置
const getEnv = () => {
  const url = window.location.href
  if (url.includes('develenv.com')) return 'dev'
  if (url.includes('betaenv.com')) return 'beta'
  if (url.includes('askaway.chat')) return 'prod'
  return 'dev'
}

export const env = getEnv()
export const envConfig = config[env as keyof typeof config]

export const login_url = () => {
  return `https://${envConfig.account}/oauth/authorize?response_type=code&client_id=${envConfig.client_id}&redirect_uri=https://${envConfig.domain}/auth/callback&scope=openid`
}

export const logout_url = (idToken: string) => {
  return `https://${envConfig.account}/oidc/logout?id_token_hint=${idToken}&post_logout_redirect_uri=https://${envConfig.domain}`
}

/**
 * 保留指定小数位数
 */
export const roundNumber = (num: number, decimals = 2) => {
  const factor = Math.pow(10, decimals)
  const rounded = Math.round((num + Number.EPSILON) * factor) / factor
  return rounded.toFixed(decimals)
}

/**
 * 检查是否启用 mock 模式
 */
export const isMockMode = (): boolean => {
  if (env === 'prod') return false
  const urlParams = new URLSearchParams(window.location.search)
  const mockValue = urlParams.get('mock')
  return mockValue === '1' || mockValue === 'true'
}

/**
 * 检查是否启用 debug 模式
 */
export const isDebugMode = (): boolean => {
  if (env === 'prod') return false
  const urlParams = new URLSearchParams(window.location.search)
  const debugValue = urlParams.get('debug')
  return debugValue === '1' || debugValue === 'true'
}
