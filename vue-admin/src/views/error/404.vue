<template>
  <div class="error-404">
    <div class="error-content"
    :style="`background-image: url('${images.bg.error}')`">
      <el-button type="primary" @click="goHome"> 返回首页 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import images from '@/utils/images'

// 组件名称
defineOptions({
  name: 'Error404'
})

const router = useRouter()

// 返回首页
const goHome = () => {
  router.push('/')
}

</script>

<style scoped>
.error-404 {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 522px;
  padding-top: 550px;
  background-position: center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  padding-bottom: 20px;
}
</style> 