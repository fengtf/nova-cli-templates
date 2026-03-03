# 后台管理系统模板

基于 Vue 3 + TypeScript + Element Plus 的后台管理系统模板，内置 SSO 登录认证、侧边栏导航、面包屑、Mock 模式等通用基础设施，开箱即可新增业务页面。

---

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue 3 | ^3.3 | 核心框架 |
| TypeScript | ~5.1 | 类型安全 |
| Element Plus | ^2.3 | UI 组件库 |
| Pinia | ^2.1 | 状态管理 |
| Vue Router 4 | ^4.2 | 路由 |
| Axios | ^1.4 | HTTP 请求 |
| Vite | ^4.4 | 构建工具 |
| Sass/SCSS | ^1.64 | 样式预处理 |

---

## 目录结构

```
src/
├── api/                # API 接口层
│   ├── index.ts        # 统一导出
│   └── user.ts         # 用户相关接口（示例）
├── assets/             # 静态资源
├── components/         # 全局公共组件
│   ├── DebugIndicator.vue  # Debug/Mock 模式指示
│   └── EmptyState.vue      # 空状态占位
├── layout/             # 布局框架
│   ├── index.vue       # 主布局
│   └── components/
│       ├── Breadcrumb.vue        # 面包屑导航
│       ├── CustomSidebar.vue     # 侧边栏
│       └── UserProfileDialog.vue # 用户信息弹窗
├── mock/               # Mock 数据
│   ├── index.ts        # 统一导出
│   ├── mapping.ts      # URL → Mock 数据映射
│   └── user.ts         # 用户 Mock 数据
├── router/             # 路由配置
│   └── index.ts
├── stores/             # Pinia 状态管理
│   ├── sidebar.ts      # 侧边栏状态
│   └── user.ts         # 用户认证状态
├── styles/             # 全局样式
├── types/              # TypeScript 类型定义
│   ├── common.ts
│   └── user.ts
├── utils/              # 工具函数
│   ├── auth.ts         # Token 存取
│   ├── constants.ts    # 全局常量
│   ├── images.ts       # 图片资源管理
│   ├── request.ts      # Axios 封装（含 Mock 拦截）
│   └── utils.ts        # 通用工具函数
├── views/              # 页面
│   ├── auth/           # 认证相关
│   │   └── callback.vue    # SSO 回调页
│   ├── error/
│   │   └── 404.vue
│   └── home/           # 示例首页
│       └── index.vue
├── App.vue
└── main.ts
```

---

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run dev
```

### 构建生产版本

```bash
pnpm run build
```

### 代码检查

```bash
pnpm run lint
```

### 类型检查

```bash
pnpm run type-check
```

---

## 新增业务页面

以新增「商品管理」模块为例：

**1. 新增 API**

```typescript
// src/api/product.ts
import request from '@/utils/request'

export const getProductList = (params: any) =>
  request.get('/api/product/list', { params })
```

在 `src/api/index.ts` 导出：

```typescript
export * from './product'
```

**2. 新增类型**

```typescript
// src/types/product.ts
export interface Product {
  id: string
  name: string
}
```

**3. 新增页面**

```
src/views/product/index.vue
```

**4. 注册路由**

在 `src/router/index.ts` 的 layout 子路由中添加：

```typescript
{
  path: '/product',
  name: 'ProductList',
  component: () => import('@/views/product/index.vue'),
  meta: { title: '商品管理', icon: 'icon-app', breadcrumb: [{ title: '商品管理', path: '/product' }] }
}
```

**5. 注册侧边菜单**

在 `src/stores/sidebar.ts` 的 `menuItems` 中添加：

```typescript
{ id: 'product', title: '商品管理', icon: 'icon-app', path: '/product' }
```

---

## Mock 模式

在 URL 后追加 `?mock=1` 即可开启 Mock 模式，所有请求将被拦截并返回 `src/mock/mapping.ts` 中配置的本地数据，无需启动后端服务。

```
http://localhost:3000/home?mock=1
```

新增 Mock 数据：在 `src/mock/mapping.ts` 中添加对应 URL 的映射。

---

## 登录认证

项目使用 SSO（OAuth 2.0 OIDC）认证，配置项位于 `src/config/config.json`（各环境的 `account`、`client_id`、`domain`）。

**开发调试时关闭登录验证**：`src/router/index.ts` 的路由守卫默认直接放行（`next()`），如需开启验证，替换为：

```typescript
router.beforeEach(async (_to, _from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  if (!userStore.token) {
    await userStore.getUserInfoAction()
    return
  }
  next()
})
```

---

## 环境要求

- **Node.js** >= 16
- **包管理器** pnpm（推荐）
- **浏览器** 支持 ES2020+ 的现代浏览器

---

## 参考文档

- [Vue 3](https://vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
