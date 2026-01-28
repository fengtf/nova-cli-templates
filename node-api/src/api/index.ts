import type koa from 'koa';
import path from 'path';
import autoRegisterRouter from '@/utils/autoImportFiles';

// 注册路由
export async function registerRouter(app: koa) {
  await autoRegisterRouter(path.join(__dirname, './v1'), false, /\.ts$/, app);
}
