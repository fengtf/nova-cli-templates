# 公共资源目录

本目录用于存放静态资源文件，如图片、字体、样式等。

## 目录结构

```
public/
├── images/      # 图片资源
├── fonts/       # 字体文件
├── styles/      # 样式文件
└── uploads/     # 用户上传文件（建议使用对象存储）
```

## 使用说明

如果需要提供静态文件服务，可以使用 `koa-static` 中间件：

```bash
pnpm add koa-static
pnpm add -D @types/koa-static
```

在 `src/index.ts` 中配置：

```typescript
import serve from 'koa-static';
import path from 'path';

app.use(serve(path.join(__dirname, '../public')));
```
