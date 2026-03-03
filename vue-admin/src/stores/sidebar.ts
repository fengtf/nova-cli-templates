import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { STORAGE_KEY } from '@/utils/constants'

// 菜单项类型定义
export interface MenuItem {
  id: string
  title: string
  icon: string
  path: string
  children?: MenuItem[]
  isActive?: boolean
}

export const useSidebarStore = defineStore('sidebar', () => {
  // 侧边栏折叠状态
  const isCollapse = ref(
    localStorage.getItem(STORAGE_KEY) === null
      ? false
      : localStorage.getItem(STORAGE_KEY) === 'true'
  )

  // 菜单项（模板示例，根据实际需求修改）
  const menuItems = ref<MenuItem[]>([
    { id: 'home', title: '首页', icon: 'icon-app', path: '/home' },
  ])

  // 当前激活的菜单项
  const activeMenuId = ref<string>('')

  // 当前路由路径
  const currentPath = ref<string>('')

  // 计算属性：显示的菜单项
  const displayMenuItems = computed(() => menuItems.value)

  // 切换侧边栏折叠状态
  function toggle() {
    isCollapse.value = !isCollapse.value
    localStorage.setItem(STORAGE_KEY, String(isCollapse.value))
  }

  function setCollapse(val: boolean) {
    isCollapse.value = val
    localStorage.setItem(STORAGE_KEY, String(val))
  }

  // 更新当前路径
  function updateCurrentPath(path: string) {
    currentPath.value = path
  }

  // 设置激活的菜单项
  function setActiveMenu(menuId: string) {
    activeMenuId.value = menuId
  }

  // 根据路由路径设置激活菜单
  function setActiveMenuByPath(path: string) {
    updateCurrentPath(path)

    const menuItem = menuItems.value.find(
      item => item.path === path || (item.children && item.children.some(child => child.path === path))
    )
    if (menuItem) {
      setActiveMenu(menuItem.id)
    } else {
      setActiveMenu('')
    }
  }

  return {
    // 状态
    isCollapse,
    menuItems,
    activeMenuId,
    currentPath,

    // 计算属性
    displayMenuItems,

    // 方法
    toggle,
    setCollapse,
    setActiveMenu,
    setActiveMenuByPath,
    updateCurrentPath,
  }
})
