<template>
  <div v-if="!item.meta?.hidden">
    <template v-if="!hasOneShowingChild(item.children, item) || (onlyOneChild.children && !(onlyOneChild as any).noShowingChildren)">
      <el-sub-menu :index="resolvePath(item.path)" popper-close-delay="10" :class="[{ 'is-parent-active': isParentActive(item) }]">
        <template #title>
          <i class="iconfont" :class="item.meta?.icon"></i>
          <span v-if="!isCollapse" class="submenu-title" @click.stop="handleParentClick(item)">{{ item.meta?.title }}</span>
        </template>
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
          :is-collapse="isCollapse"
        />
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="resolvePath(onlyOneChild.path)">
        <template #title>
          <i class="iconfont" :class="onlyOneChild.meta?.icon"></i>
          {{ onlyOneChild.meta?.title }}
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import path from 'path-browserify'

interface Props {
  item: RouteRecordRaw
  basePath: string
  isCollapse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isCollapse: false
})
const onlyOneChild = ref<RouteRecordRaw>({} as RouteRecordRaw)
const router = useRouter()
const route = useRoute()

// 判断是否只有一个显示的子路由
const hasOneShowingChild = (children: RouteRecordRaw[] = [], parent: RouteRecordRaw) => {
  const showingChildren = children.filter(item => {
    if (item.meta?.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })

  if (showingChildren.length === 1) {
    return true
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true } as unknown as RouteRecordRaw
    return true
  }

  return false
}

// 解析路径
const resolvePath = (routePath: string) => {
  if (routePath.startsWith('/')) {
    return routePath
  }
  return path.resolve(props.basePath, routePath)
}

const handleParentClick = (routeRecord: RouteRecordRaw) => {
  const target = resolvePath(routeRecord.path)
  router.push(target)
}

const isParentActive = (routeRecord: RouteRecordRaw) => {
  const parentPath = resolvePath(routeRecord.path)
  return route.path === parentPath
}
</script>

<style scoped lang="scss">
:deep(.el-menu-item),:deep(.el-sub-menu) {
  .iconfont {
    margin-right: 8px;
  }
}

.submenu-title {
  cursor: pointer;
}
</style> 