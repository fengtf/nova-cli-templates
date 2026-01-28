/**
 * HTTP 状态码枚举
 */
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

/**
 * 业务错误码枚举
 */
export enum ErrorCode {
  SUCCESS = 0,
  UNKNOWN_ERROR = 10001,
  INVALID_PARAMS = 10002,
  UNAUTHORIZED = 10003,
  FORBIDDEN = 10004,
  NOT_FOUND = 10005,
  DATABASE_ERROR = 10006,
  NETWORK_ERROR = 10007,
  TOKEN_EXPIRED = 10008,
  TOKEN_INVALID = 10009,
}

/**
 * 用户角色枚举
 */
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

/**
 * 日志级别枚举
 */
export enum LogLevel {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

/**
 * 数据状态枚举
 */
export enum DataStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
  PENDING = 'pending',
}

/**
 * 排序方向枚举
 */
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
