<template>
  <div class="empty-state">
    <div class="empty-icon">
      <el-icon size="64" color="#c0c4cc">
        <Document />
      </el-icon>
    </div>
    <div class="empty-content">
      <h3 class="empty-title">{{ title }}</h3>
      <p class="empty-description">{{ description }}</p>
      <div v-if="$slots.action" class="empty-action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Document } from '@element-plus/icons-vue'

interface Props {
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: '暂无数据',
  description: '当前没有相关数据，请稍后再试'
})
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.empty-content {
  max-width: 400px;
}

.empty-title {
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 500;
  color: #606266;
}

.empty-description {
  margin: 0 0 24px 0;
  font-size: 14px;
  color: #909399;
  line-height: 1.5;
}

.empty-action {
  display: flex;
  justify-content: center;
  gap: 12px;
}
</style> 