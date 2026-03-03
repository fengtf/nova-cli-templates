// 用户角色, 企业用户还是个人用户
export enum UserRole {
  ENTERPRISE = 'enterprise',
  PERSONAL = 'personal'
}

// 用户信息
export interface UserInfo {
  id: string
  username: string
  name: string
  avatar: string
  email: string
  // phone: string
  roles: string[]
  // permissions: string[]
  // status: number
  createTime: string
  updateTime: string
  // 是企业账号还是个人账号
  role: UserRole
}


// JWT认证参数
export interface AuthCallbackParam {
  code: string
  // state: string
}