<template>
  <div class="debug-indicator" v-if="isAnyModeEnabled">
    <!-- Debug模式提示 -->
    <div v-if="isDebugEnabled" class="debug-tag">
      <el-tag type="danger" size="small">
        <el-icon><Tools /></el-icon>
        Debug模式已启用
      </el-tag>
    </div>
    
    <!-- Mock模式提示 -->
    <div v-if="isMockEnabled" class="mock-tag">
      <el-tag type="warning" size="small">
        <el-icon><Warning /></el-icon>
        Mock模式已启用
      </el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Tools, Warning } from '@element-plus/icons-vue'
import { isDebugMode, isMockMode } from '@/utils/utils'

const route = useRoute()

// 使用 ref 来存储状态，这样可以通过 watch 来更新
const debugEnabled = ref(isDebugMode())
const mockEnabled = ref(isMockMode())

// 监听路由变化，更新状态
watch(
  () => route.fullPath,
  () => {
    debugEnabled.value = isDebugMode()
    mockEnabled.value = isMockMode()
  },
  { immediate: true }
)

// 额外监听 URL 参数变化，确保即使在同一路由内也能响应
watch(
  () => route.query,
  () => {
    debugEnabled.value = isDebugMode()
    mockEnabled.value = isMockMode()
  },
  { deep: true }
)

// 计算属性
const isDebugEnabled = computed(() => debugEnabled.value)
const isMockEnabled = computed(() => mockEnabled.value)
const isAnyModeEnabled = computed(() => isDebugEnabled.value || isMockEnabled.value)
</script>

<style scoped>
.debug-indicator {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
  display: flex;
  /* flex-direction: column; */
  gap: 8px;
}

/* 当同时启用两种模式时，调整位置避免重叠 */
.debug-indicator:has(.debug-tag + .mock-tag) {
  gap: 6px;
}
</style>
