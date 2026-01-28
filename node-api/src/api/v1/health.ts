import Router from 'koa-router';

const healthRouter = new Router({ prefix: '/api/v1' });

// 健康检查接口
healthRouter.get('/health', async (ctx) => {
  ctx.body = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.CURRENT_ENV || 'dev',
  };
});

// 版本信息接口
healthRouter.get('/version', async (ctx) => {
  ctx.body = {
    version: '1.0.0',
    name: 'Node API Template',
    node: process.version,
  };
});

export default healthRouter;
