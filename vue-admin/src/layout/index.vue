<template>
  <div class="app-wrapper">
    <DebugIndicator />

    <!-- 侧边栏 -->
    <div
      class="sidebar-container"
      :class="{ 'is-collapse': isCollapse }"
      :style="`background-image:url(${images.bg.sidebar})`"
    >
      <div class="logo">
        <img :src="images.logos.main" alt="Logo">
      </div>

      <CustomSidebar />

      <div class="sidebar-footer">
        <UserProfileDialog v-model="showUserProfileDialog" />
      </div>
    </div>

    <!-- 主体内容区域 -->
    <div class="main-container">
      <div class="content-container">
        <div class="app-main">
          <div class="navbar">
            <Breadcrumb />
          </div>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import CustomSidebar from './components/CustomSidebar.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import UserProfileDialog from './components/UserProfileDialog.vue'
import DebugIndicator from '@/components/DebugIndicator.vue'
import images from '@/utils/images'

defineOptions({
  name: 'MainLayout'
})

const sidebarStore = useSidebarStore()
const isCollapse = computed(() => sidebarStore.isCollapse)
const showUserProfileDialog = ref(false)
</script>

<style lang="scss" scoped>
.app-wrapper {
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.sidebar-container {
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0;
  width: var(--el-sidebar-width);
  height: 100vh;
  background-color: #f0f2fe;
  background-position: top center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  box-shadow: var(--el-sidebar-box-shadow);

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--el-padding-xlarge) 0;
    overflow: hidden;

    img {
      width: var(--el-logo-width);
    }
  }
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: var(--el-padding-xxlarge) 0 0;
  background: var(--el-body-bg-color);
  height: calc(var(--el-font-size-extra-large) + var(--el-padding-xxlarge) + var(--el-gap-large));
}

.content-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.app-main {
  padding: 0 var(--el-gap-large) var(--el-gap-large);
}

.sidebar-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid var(--el-sidebar-border-color-light);
}
</style>
