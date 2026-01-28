/**
 * 通用响应类型
 */
export interface ApiResponse<T = any> {
  code: number;
  msg: string;
  errorCode: number;
  data: T;
}

/**
 * 分页参数
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * 分页响应
 */
export interface PaginationResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * 用户信息
 */
export interface UserInfo {
  id: string;
  username: string;
  name?: string;
  email?: string;
  avatar?: string;
  roles?: string[];
}

/**
 * JWT Token 载荷
 */
export interface JwtPayload {
  userId: string;
  username: string;
  iat?: number;
  exp?: number;
}

/**
 * 数据库查询结果
 */
export type DaoResult<T> = [Error | null, T | null];

/**
 * 环境类型
 */
export type Environment = 'dev' | 'prod' | 'test';

/**
 * 日志级别
 */
export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
