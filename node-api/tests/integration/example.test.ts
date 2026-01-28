import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import Koa from 'koa';
import Router from 'koa-router';
import Resolve from '@/lib/helper';

describe('Example API Integration Tests', () => {
  let app: Koa;
  let server: any;

  beforeAll(() => {
    // 创建测试应用
    app = new Koa();
    const router = new Router({ prefix: '/api/v1/example' });
    const res = new Resolve();

    // 模拟路由
    router.get('/list', async (ctx) => {
      ctx.body = res.json([
        { id: 1, name: '示例1' },
        { id: 2, name: '示例2' },
      ]);
    });

    router.get('/:id', async (ctx) => {
      const { id } = ctx.params;
      ctx.body = res.json({ id, name: '示例' });
    });

    app.use(router.routes());
    server = app.listen();
  });

  afterAll(() => {
    server.close();
  });

  describe('GET /api/v1/example/list', () => {
    it('应该返回列表数据', async () => {
      const response = await request(server).get('/api/v1/example/list');

      expect(response.status).toBe(200);
      expect(response.body.code).toBe(200);
      expect(response.body.data).toHaveLength(2);
    });
  });

  describe('GET /api/v1/example/:id', () => {
    it('应该返回指定 ID 的数据', async () => {
      const response = await request(server).get('/api/v1/example/123');

      expect(response.status).toBe(200);
      expect(response.body.code).toBe(200);
      expect(response.body.data.id).toBe('123');
    });
  });
});
