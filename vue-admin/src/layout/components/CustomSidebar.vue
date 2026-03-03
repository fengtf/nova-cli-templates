<template>
  <div class="custom-sidebar">
    <div class="menu-section">
      <div class="menu-items">
        <div
          v-for="item in displayMenuItems"
          :key="item.id"
          class="menu-item"
          :class="{ 'is-active': activeMenuId === item.id }"
          @click="handleMenuClick(item)"
        >
          <i v-if="item.icon" class="iconfont" :class="item.icon"></i>
          <i v-else class="placeholder"></i>
          <span v-if="!isCollapse">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'
import type { MenuItem } from '@/stores/sidebar'

defineOptions({
  name: 'CustomSidebar'
})

const router = useRouter()
const route = useRoute()
const sidebarStore = useSidebarStore()

const isCollapse = computed(() => sidebarStore.isCollapse)
const activeMenuId = computed(() => sidebarStore.activeMenuId)
const displayMenuItems = computed(() => sidebarStore.displayMenuItems)

const handleMenuClick = (item: MenuItem) => {
  sidebarStore.setActiveMenu(item.id)
  router.push(item.path)
}

const setActiveMenuByRoute = () => {
  sidebarStore.setActiveMenuByPath(route.path)
}

watch(() => route.path, () => {
  setActiveMenuByRoute()
}, { immediate: true })

onMounted(() => {
  setActiveMenuByRoute()
})
</script>

<style lang="scss" scoped>
.custom-sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
}

.menu-section {
  flex: 1;

  .menu-items {
    .menu-item {
      display: flex;
      align-items: center;
      padding: 10px 16px;
      margin-bottom: 8px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: var(--el-color-primary);
        color: #fff;
      }

      &.is-active {
        background: var(--el-color-primary);
        color: #fff;
      }

      .iconfont {
        margin-right: 8px;
        font-size: 16px;
      }

      .placeholder {
        width: 24px;
      }

      span {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}

.custom-sidebar {
  :deep(.el-menu) {
    border-right: none;
  }
}
</style>
