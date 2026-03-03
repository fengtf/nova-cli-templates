# Mock数据使用说明

## 概述
本项目支持在开发阶段使用mock数据来模拟API接口返回，避免依赖后端服务。所有mock数据都统一管理在 `src/mock/` 文件夹中，通过 `src/utils/request.ts` 进行统一处理。

## 文件结构

```
src/mock/
├── index.ts          # 统一导出入口
├── mapping.ts        # Mock数据映射关系
├── user.ts           # 用户相关Mock数据
├── billing.ts        # 账单相关Mock数据
├── app.ts            # 应用相关Mock数据
├── knowledge.ts      # 知识库相关Mock数据
├── engine.ts         # 引擎相关Mock数据
├── cos.ts            # COS相关Mock数据
└── README.md         # 本文档
```

## 配置说明

### 1. Mock开关
在 `src/utils/request.ts` 文件中，有一个 `ENABLE_MOCK` 常量：

```typescript
const ENABLE_MOCK = true  // 设置为true启用mock数据，false禁用
```

### 2. Mock数据位置
所有mock数据都按功能模块分类定义在 `src/mock/` 文件夹中：
- `user.ts` - 用户相关接口的mock数据
- `billing.ts` - 账单相关接口的mock数据
- `app.ts` - 应用相关接口的mock数据
- `knowledge.ts` - 知识库相关接口的mock数据
- `engine.ts` - 引擎相关接口的mock数据
- `cos.ts` - COS相关接口的mock数据

## 当前支持的Mock接口

### 用户相关接口
1. **getToken** (`POST:/api/get_token`)
   - 返回格式：
   ```json
   {
     "code": 0,
     "data": {
       "token": "813b7fe6-b007-455c-bde6-82800454d0c3"
     },
     "message": "成功"
   }
   ```

2. **getUserInfo** (`GET:/api/user/info`)
   - 返回用户信息数据

### 账单相关接口
3. **getUserBalance** (`GET:/api/users/balance`)
   - 返回用户余额信息

4. **createRechargeOrder** (`POST:/api/orders`)
   - 返回创建充值订单响应

5. **getOrderStatus** (`GET:/api/orders/{orderId}`)
   - 返回订单状态信息

6. **getRechargeOrders** (`GET:/api/users/orders`)
   - 返回充值记录列表

7. **getConsumptionDetails** (`GET:/api/users/deductions`)
   - 返回消费明细列表

### 应用相关接口
8. **getAppList** (`GET:/api/app/list`)
   - 返回应用列表数据

9. **getAppDetail** (`GET:/api/app/{id}`)
   - 返回应用详情数据

10. **createApp** (`POST:/api/app/create`)
    - 返回创建成功响应

11. **updateApp** (`PUT:/api/app/{id}`)
    - 返回更新成功响应

12. **deleteApp** (`DELETE:/api/app/{id}`)
    - 返回删除成功响应

13. **getEngines** (`GET:/api/engines`)
    - 返回引擎列表数据

### 知识库相关接口
14. **getKnowledgeList** (`GET:/api/knowledge_base/list`)
    - 返回知识库列表数据

15. **getKnowledgeDetail** (`GET:/api/knowledge_base/{id}`)
    - 返回知识库详情数据

16. **createKnowledgeCategory** (`POST:/api/knowledge_base/create`)
    - 返回创建成功响应

17. **updateKnowledgeCategory** (`PUT:/api/knowledge_base/{id}`)
    - 返回更新成功响应

18. **deleteKnowledgeCategory** (`DELETE:/api/knowledge_base/{id}`)
    - 返回删除成功响应

19. **syncKnowledge** (`PUT:/api/knowledge_base/sync/{id}`)
    - 返回同步成功响应

20. **getNetdiskProviders** (`GET:/api/netdisk/providers`)
    - 返回网盘服务商列表

21. **saveNetdiskToken** (`POST:/api/netdisk/token`)
    - 返回保存成功响应

22. **getNetdiskToken** (`POST:/api/netdisk/get_token`)
    - 返回网盘token信息

### COS相关接口
23. **getCosToken** (`GET:/api/cos/token`)
    - 返回COS Token信息

## 使用方法

### 添加新的Mock接口
1. 在对应的功能模块文件中添加mock数据定义（如 `user.ts`、`app.ts` 等）
2. 在 `src/mock/mapping.ts` 中添加映射关系
3. 在 `src/mock/index.ts` 中导出新的mock数据

### 示例
```typescript
// 1. 在 user.ts 中添加mock数据定义
export const mockNewUserApiResponse = {
  code: 0,
  data: { /* 你的数据 */ },
  message: "成功"
}

// 2. 在 mapping.ts 中添加映射
export const mockDataMap: Record<string, any> = {
  // ... 现有映射
  'GET:/api/new_user_api': mockNewUserApiResponse  // 添加新接口
}

// 3. 在 index.ts 中导出（如果需要）
export * from './user'
```

### 修改现有Mock数据
1. 直接修改对应功能模块文件中的数据
2. 修改后保存文件，开发服务器会自动重新加载

## 数据映射规则

Mock数据使用 `METHOD:URL` 的格式作为键进行映射：

```typescript
const mockKey = `${config.method.toUpperCase()}:${config.url}`
```

例如：
- `POST:/api/get_token` → `mockGetTokenResponse`
- `POST:/api/orders` → `mockCreateOrderResponse`

## 注意事项
1. Mock数据仅在开发阶段使用，生产环境会自动禁用
2. 修改mock数据后开发服务器会自动重新加载，无需重启
3. 确保mock数据的格式与真实API返回格式一致
4. 所有mock数据都通过 `src/mock/index.ts` 统一导出
5. 数据映射关系统一在 `src/mock/mapping.ts` 中管理
6. 新增接口时请遵循现有的文件组织结构和命名规范