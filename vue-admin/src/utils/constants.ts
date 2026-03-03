// 侧边栏折叠状态持久化 key
export const STORAGE_KEY = 'sidebar_is_collapse'

// 默认显示值常量
export const DEFAULT_DISPLAY_VALUES = {
  EMPTY_TEXT: '-',
  EMPTY_DESCRIPTION: '暂无描述',
}

// 检查值是否为空并返回默认值
export const getDisplayValue = (value: any, defaultValue: string = DEFAULT_DISPLAY_VALUES.EMPTY_TEXT): string => {
  if (value === null || value === undefined || value === '') {
    return defaultValue
  }
  return String(value)
}
