# Node.js API 通用模板

> 基于 Koa.js + TypeScript 的企业级后端服务模板，开箱即用

## 📋 项目简介

这是一个功能完整的 Node.js API 通用模板，提供了企业级后端服务的最佳实践和完整的项目结构。

### ✨ 核心特性

- 🚀 **TypeScript** - 类型安全，提升开发体验
- 🎯 **Koa.js** - 轻量级、模块化的 Web 框架
- 🔐 **JWT 认证** - 安全的 Token 认证机制
- 📊 **日志系统** - 基于 Log4js 的完整日志记录
- 🗄️ **MongoDB** - Mongoose ODM，优雅的数据建模
- 💾 **Redis** - 缓存和会话管理
- 🔄 **路由自动注册** - 约定式路由，自动扫描注册
- 🛡️ **错误处理** - 统一的错误处理机制
- 🌐 **CORS** - 跨域资源共享配置
- 📦 **模块别名** - @/ 路径别名，简化导入
- 🐳 **Docker** - 容器化部署支持
- ☸️ **Kubernetes** - K8s 部署配置

## 🛠 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Node.js | >= 18.x | JavaScript 运行时 |
| TypeScript | ^5.x | 类型安全 |
| Koa | ^2.15.x | Web 框架 |
| MongoDB | ^8.x | 数据库 |
| Redis | ^4.x | 缓存 |
| JWT | ^8.x | 身份认证 |
| Log4js | ^6.x | 日志系统 |
| pnpm | ^8.x | 包管理器 |

## 📦 快速开始

### 环境要求

- Node.js >= 18.x
- MongoDB >= 5.x
- Redis >= 6.x
- pnpm >= 8.x

### 安装依赖

```bash
# 安装依赖
pnpm install
```

### 配置环境

1. 复制配置文件模板

```bash
cp src/config/config.example.json src/config/config.json
```

2. 修改配置文件 `src/config/config.json`

```json
{
  "mongodb": {
    "host": "127.0.0.1",
    "port": 27017,
    "dbName": "your-database-name",
    "username": "",
    "password": ""
  },
  "jwt": {
    "secret": "your-secret-key",
    "expiresIn": "2h"
  }
}
```

3. 配置环境变量文件

编辑 `.env.development` 或 `.env.production`

```bash
# 服务端口
SERVER_PORT=3050

# JWT 配置（可选，会覆盖 config.json 中的配置）
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=2h
```

### 启动项目

```bash
# 开发环境
pnpm start:dev

# 生产环境
pnpm start:prod
```

服务启动后访问：`http://localhost:3050`

## 📁 项目结构

```
src/
├── api/              # API 路由层
│   ├── index.ts      # 路由注册入口
│   └── v1/           # v1 版本接口
│       ├── auth.ts   # 认证接口
│       ├── example.ts # 示例 CRUD 接口
│       └── health.ts # 健康检查接口
├── config/           # 配置文件
│   ├── index.ts      # 配置加载
│   ├── logger.ts     # 日志配置
│   ├── config.json   # 项目配置（需自行创建）
│   └── config.example.json # 配置示例
├── core/             # 核心功能模块
│   ├── httpError.ts  # HTTP 错误类
│   └── http-exception.ts
├── dao/              # 数据访问层
│   ├── example.ts    # 示例 DAO
│   └── users.ts      # 用户 DAO
├── db/               # 数据库连接
│   └── index.ts      # MongoDB 连接
├── lib/              # 工具库
│   ├── helper.ts     # 响应助手
│   ├── httpClient.ts # HTTP 客户端封装
│   └── idp.ts        # IDP 工具
├── middlewares/      # 中间件
│   ├── cors.ts       # CORS 配置
│   ├── jwt.ts        # JWT 认证中间件
│   ├── logger.ts     # 日志中间件
│   └── response.ts   # 响应处理中间件
├── model/            # 数据模型
│   ├── example.ts    # 示例模型
│   └── users.ts      # 用户模型
├── services/         # 业务服务层
│   ├── BaseService.ts # 基础服务类
│   └── index.ts
├── types/            # 类型定义
│   ├── enums.ts      # 枚举类型
│   └── index.ts
├── utils/            # 工具函数
│   ├── autoImportFiles.ts # 文件自动导入
│   └── index.ts
└── index.ts          # 应用入口
```

## 🔧 核心功能

### 路由自动注册

项目支持路由自动注册，只需在 `src/api/v1/` 目录下创建路由文件即可。

```typescript
// src/api/v1/your-route.ts
import Router from 'koa-router';
import Resolve from '@/lib/helper';

const res = new Resolve();
const router = new Router({ prefix: '/api/v1/your-route' });

router.get('/list', async (ctx) => {
  ctx.body = res.json({ data: [] });
});

export default router;
```

### JWT 认证

```typescript
import { autoRefreshToken } from '@/middlewares/jwt';

// 需要认证的路由
router.get('/protected', autoRefreshToken, async (ctx) => {
  const user = ctx.state.user; // 获取当前用户信息
  ctx.body = res.json(user);
});
```

### 数据访问层（DAO）

```typescript
// src/dao/example.ts
import ExampleModel from '@/model/example';

class ExampleDao {
  async getById(id: string) {
    try {
      const result = await ExampleModel.findOne({ id });
      return [null, result];
    } catch (error) {
      return [error, null];
    }
  }
}

export default new ExampleDao();
```

### 统一响应格式

```typescript
import Resolve from '@/lib/helper';

const res = new Resolve();

// 成功响应
ctx.body = res.json({ data: 'success' });
// { code: 200, message: '成功', data: { data: 'success' } }

// 失败响应
ctx.body = res.fail('error', '操作失败');
// { code: -1, message: '操作失败', data: null }
```

### 错误处理

项目内置统一的错误处理机制：

```typescript
import HttpError from '@/core/httpError';

// 抛出业务错误
throw new HttpError(400, '参数错误');

// 错误会被自动捕获并返回统一格式
```

### 日志系统

```typescript
import { logger } from '@/config/logger';

logger.info('信息日志');
logger.error('错误日志');
logger.warn('警告日志');
logger.debug('调试日志');
```

## 📚 API 文档

### 健康检查

**GET** `/api/v1/health`

响应示例：

```json
{
  "status": "ok",
  "timestamp": "2026-01-28T10:00:00.000Z",
  "uptime": 123.456,
  "environment": "dev"
}
```

### 认证接口

#### 登录

**POST** `/api/v1/auth/login`

请求参数：

```json
{
  "username": "admin",
  "password": "123456"
}
```

响应示例：

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userInfo": {
      "id": "1",
      "username": "admin",
      "name": "示例用户"
    }
  }
}
```

#### 获取用户信息

**GET** `/api/v1/auth/userinfo`

请求头：

```
Authorization: Bearer <token>
```

### 示例 CRUD 接口

#### 获取列表

**GET** `/api/v1/example/list`

#### 获取详情

**GET** `/api/v1/example/:id`

#### 创建数据

**POST** `/api/v1/example/create`

#### 更新数据

**PUT** `/api/v1/example/update/:id`

#### 删除数据

**DELETE** `/api/v1/example/delete/:id`

## 🐳 Docker 部署

### 构建镜像

```bash
docker build -t node-api-template .
```

### 运行容器

```bash
docker run -d \
  -p 80:80 \
  -e SERVER_PORT=80 \
  -e CURRENT_ENV=prod \
  --name api-server \
  node-api-template
```

### Docker Compose

创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3050:80"
    environment:
      - SERVER_PORT=80
      - CURRENT_ENV=prod
    depends_on:
      - mongodb
      - redis

  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

volumes:
  mongo-data:
  redis-data:
```

运行：

```bash
docker-compose up -d
```

## ☸️ Kubernetes 部署

项目提供了 K8s 部署配置文件：

```bash
# 部署
kubectl apply -f manifests/

# 查看状态
kubectl get pods
kubectl get services
```

## 🔐 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| SERVER_PORT | 服务端口 | 3050 |
| CURRENT_ENV | 当前环境 | dev |
| JWT_SECRET | JWT 密钥 | - |
| JWT_EXPIRES_IN | Token 过期时间 | 2h |

## 📝 开发指南

### 添加新接口

1. 在 `src/api/v1/` 目录下创建路由文件
2. 定义路由和处理函数
3. 导出 router 实例（自动注册）

### 添加数据模型

1. 在 `src/model/` 目录下创建模型文件
2. 定义 Mongoose Schema
3. 在 `src/dao/` 目录下创建对应的 DAO

### 添加中间件

1. 在 `src/middlewares/` 目录下创建中间件文件
2. 在 `src/index.ts` 中注册中间件

### 添加业务服务

1. 在 `src/services/` 目录下创建服务文件
2. 继承 `BaseService` 类（可选）
3. 实现业务逻辑

## 🧪 最佳实践

### 1. 使用 DAO 模式

将数据访问逻辑封装在 DAO 层，保持代码清晰。

### 2. 统一错误处理

使用 `HttpError` 抛出业务错误，由中间件统一处理。

### 3. 日志记录

在关键位置添加日志，便于问题排查。

### 4. 环境配置

敏感信息使用环境变量，不同环境使用不同配置文件。

### 5. 代码规范

使用 TypeScript 严格模式，保持代码类型安全。

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 License

[MIT](LICENSE)

## 👥 维护者

如有问题，请提交 Issue 或联系维护者。

---

**Happy Coding! 🎉**
