import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as userApi from '@/api/user'
import { userTypes } from '@/types'
import { setToken, removeToken, getToken, setIdToken, getIdToken, removeIdToken } from '@/utils/auth'
import { logout_url } from '@/utils/utils'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(getToken() || '')
  const idToken = ref<string>(getIdToken() || '')
  const userInfo = ref<userTypes.UserInfo | null>(null)
  const roles = ref<string[]>([])

  // 获取用户信息
  const getUserInfoAction = async () => {
    const response = await userApi.getUserInfo()
    if (response && response.data) {
      userInfo.value = response.data
      roles.value = response.data.roles || []
      userInfo.value.role = userTypes.UserRole.PERSONAL
      return response.data
    } else {
      throw new Error('用户信息响应数据格式错误')
    }
  }

  // 登出
  const logout = async () => {
    token.value = ''
    userInfo.value = null
    roles.value = []
    removeToken()
    removeIdToken()

    window.location.href = logout_url(idToken.value)
  }

  // 重置状态
  const resetState = () => {
    token.value = ''
    idToken.value = ''
    userInfo.value = null
    roles.value = []
    removeToken()
    removeIdToken()
  }

  // 认证回调
  const authCallbackAction = async (callbackParam: userTypes.AuthCallbackParam) => {
    try {
      const response = await userApi.getToken(callbackParam)
      if (response && response.data && response.data.session_token) {
        token.value = response.data.session_token
        idToken.value = response.data.id_token
        setToken(response.data.session_token)
        setIdToken(response.data.id_token)
        return response.data
      } else {
        throw new Error('认证响应数据格式错误')
      }
    } catch (error) {
      console.error('认证回调失败:', error)
      throw error
    }
  }

  return {
    token,
    userInfo,
    roles,
    getUserInfoAction,
    logout,
    resetState,
    authCallbackAction
  }
})
