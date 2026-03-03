<template>
  <el-breadcrumb separator="/" :class="breadcrumbClass">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
      <span v-if="index === breadcrumbs.length - 1 || breadcrumbs.length === 1">{{ item.title }}</span>
      <router-link v-else :to="item.path">{{ item.title }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'BreadcrumbNav'
})

const route = useRoute()

interface BreadcrumbItem {
  title: string
  path: string
}

const breadcrumbs = ref<BreadcrumbItem[]>([])

const breadcrumbClass = computed(() => ({
  'breadcrumb-single': breadcrumbs.value.length === 1,
  'breadcrumb-multiple': breadcrumbs.value.length > 1,
}))

const getBreadcrumbs = () => {
  if (route.meta?.breadcrumb) {
    breadcrumbs.value = route.meta.breadcrumb as BreadcrumbItem[]
    return
  }

  const matched = route.matched.filter(item => item.meta?.title)
  breadcrumbs.value = matched.map((item, index) => ({
    title: item.meta.title as string,
    path: index === matched.length - 1 ? '' : item.path,
  }))
}

watch(() => route.path, getBreadcrumbs, { immediate: true })
</script>

<style scoped lang="scss">
.breadcrumb-single {
  :deep(.el-breadcrumb__item) {
    .el-breadcrumb__inner {
      font-size: 24px;
      font-weight: 600;
      color: #343434;
      cursor: default;

      &.is-link {
        cursor: default;
        pointer-events: none;
      }
    }
  }

  :deep(.el-breadcrumb__separator) {
    display: none;
  }
}

.breadcrumb-multiple {
  :deep(.el-breadcrumb__item) {
    .el-breadcrumb__inner {
      font-size: 16px;
      font-weight: 500;
      color: #343434;
      transition: color 0.3s ease;

      a {
        color: #8a8b8c;
        font-weight: 400;
      }

      span {
        color: #303133;
        font-weight: 400;
      }

      &:hover {
        color: #409eff;
      }
    }
  }

  :deep(.el-breadcrumb__separator) {
    color: #c0c4cc;
    margin: 0 8px;
  }
}

:deep(.el-breadcrumb) {
  line-height: 1.5;
}

:deep(.el-breadcrumb__inner) {
  text-decoration: none;

  &.is-link {
    cursor: pointer;
  }
}
</style>
