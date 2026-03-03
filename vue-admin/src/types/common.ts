// 通用响应格式
export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// 分页响应格式
export interface PaginatedResponse<T = any> {
  list?: T[]
  rows?: T[]
  page: number
  page_size: number
  total: number
}

export interface PaginatedRequest {
  page: number
  page_size: number
}

// 成功响应
export const createSuccessResponse = <T>(data: T, message: string = '成功'): ApiResponse<T> => ({
  code: 0,
  data,
  message
})

// 失败响应
export const createErrorResponse = (message: string, code: number = -1): ApiResponse<null> => ({
  code,
  data: null,
  message
})
