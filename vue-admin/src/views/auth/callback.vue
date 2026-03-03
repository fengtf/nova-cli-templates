<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { userTypes } from '@/types'

// 组件名称
defineOptions({
  name: 'CallbackPage'
})

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 处理认证回调
const handleAuthCallback = async () => {
  try {
    // 从URL参数获取回调参数
    const callbackParam: userTypes.AuthCallbackParam = {
      code: route.query.code as string,
      // state: route.query.state as string
    }
    
    if (!callbackParam.code) {
      throw new Error('缺少必要的回调参数')
    }
    
    // 调用认证回调
    await userStore.authCallbackAction(callbackParam)
    
    // 成功后跳转到首页
    router.push('/')
    
  } catch (err: any) {
    console.error('认证回调失败:', err)
    // 认证失败时跳转到登录页
    router.push('/')
  }
}

// 组件挂载时执行认证回调
onMounted(() => {
  handleAuthCallback()
})
</script> 