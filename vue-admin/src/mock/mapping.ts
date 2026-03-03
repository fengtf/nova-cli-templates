// Mock数据映射关系 - 使用URL+Method作为键
import {
  mockGetTokenResponse,
  mockUserInfoResponse,
} from './index'

export const mockDataMap: Record<string, any> = {
  // 用户相关接口
  'POST:/api/get_token': mockGetTokenResponse,
  'GET:/api/user/info': mockUserInfoResponse,
}
