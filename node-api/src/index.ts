require('module-alias/register');
import koa from 'koa';
import koaBody from 'koa-body';
import Cors from 'koa2-cors';
import { registerRouter } from '@/api';
import { corsHandler } from '@/middlewares/cors';
import { loggerMiddleware } from '@/middlewares/logger';
import { errorHandler, responseHandler } from '@/middlewares/response';

import '@/config';
import '@/db';

const app = new koa();
// 日志打印
app.use(loggerMiddleware);
// 错误处理
app.use(errorHandler);
// 跨域
app.use(Cors(corsHandler));

// 请求参数解析
app.use(koaBody());

(async () => {
  // 注册路由
  await registerRouter(app);

  // 请求响应处理
  app.use(responseHandler);

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`http://localhost:${process.env.SERVER_PORT}`);
  });
})();
