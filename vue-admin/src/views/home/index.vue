<template>
  <div class="home-page">
    <div class="welcome-card">
      <div class="welcome-icon">
        <i class="iconfont icon-app"></i>
      </div>
      <h1 class="welcome-title">欢迎使用后台管理系统</h1>
      <p class="welcome-desc">这是一个基于 Vue 3 + TypeScript + Element Plus 的后台管理系统模板。</p>
      <div class="tech-stack">
        <el-tag type="primary">Vue 3</el-tag>
        <el-tag type="success">TypeScript</el-tag>
        <el-tag type="warning">Element Plus</el-tag>
        <el-tag type="info">Vite</el-tag>
        <el-tag>Pinia</el-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'HomePage'
})
</script>

<style scoped lang="scss">
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 40px;
}

.welcome-card {
  text-align: center;
  max-width: 560px;
  padding: 60px 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);

  .welcome-icon {
    font-size: 56px;
    color: var(--el-color-primary);
    margin-bottom: 24px;
  }

  .welcome-title {
    font-size: 28px;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0 0 16px;
  }

  .welcome-desc {
    font-size: 15px;
    color: #666;
    line-height: 1.8;
    margin: 0 0 32px;
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;

    .el-tag {
      font-size: 13px;
      padding: 6px 14px;
      height: auto;
      border-radius: 20px;
    }
  }
}
</style>
