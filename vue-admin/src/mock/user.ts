// 用户相关Mock数据
import type { ApiResponse } from '@/types/common'
import type { UserInfo, AuthCallbackParam } from '@/types/user'
import { UserRole } from '@/types/user'

export const mockGetTokenResponse = {
  token: "813b7fe6-b007-455c-bde6-82800454d0c3"
}

export const mockUserInfoResponse = {
  id: "user_001",
  username: "testuser",
  name: "测试用户",
  avatar: "https://example.com/avatar.png",
  email: "test@example.com",
  roles: ["user"],
  createTime: "2024-01-01 00:00:00.000000000 UTC",
  updateTime: "2024-01-01 00:00:00.000000000 UTC",
  role: UserRole.PERSONAL
}
