import Router from 'koa-router';
import Resolve from '@/lib/helper';
import { autoRefreshToken } from '@/middlewares/jwt';

const res = new Resolve();

const exampleRouter = new Router({ prefix: '/api/v1/example' });

// 示例：获取列表
exampleRouter.get('/list', async (ctx) => {
  try {
    // 这里可以从数据库查询数据
    const list = [
      { id: 1, name: '示例1', description: '这是一个示例数据' },
      { id: 2, name: '示例2', description: '这是另一个示例数据' },
    ];
    ctx.body = res.json(list);
  } catch (error: any) {
    ctx.body = res.fail(error, '获取列表失败');
  }
});

// 示例：获取详情
exampleRouter.get('/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    // 这里可以从数据库查询单条数据
    const detail = { id, name: '示例', description: '这是详情数据' };
    ctx.body = res.json(detail);
  } catch (error: any) {
    ctx.body = res.fail(error, '获取详情失败');
  }
});

// 示例：创建数据（需要认证）
exampleRouter.post('/create', autoRefreshToken, async (ctx) => {
  try {
    const data = ctx.request.body;
    // 这里可以保存到数据库
    // await exampleDao.create(data);
    ctx.body = res.json(data, '创建成功');
  } catch (error: any) {
    ctx.body = res.fail(error, '创建失败');
  }
});

// 示例：更新数据（需要认证）
exampleRouter.put('/update/:id', autoRefreshToken, async (ctx) => {
  try {
    const { id } = ctx.params;
    const data = ctx.request.body;
    // 这里可以更新数据库
    // await exampleDao.update(id, data);
    ctx.body = res.json({ id, ...data }, '更新成功');
  } catch (error: any) {
    ctx.body = res.fail(error, '更新失败');
  }
});

// 示例：删除数据（需要认证）
exampleRouter.delete('/delete/:id', autoRefreshToken, async (ctx) => {
  try {
    const { id } = ctx.params;
    // 这里可以从数据库删除
    // await exampleDao.delete(id);
    ctx.body = res.json({ id }, '删除成功');
  } catch (error: any) {
    ctx.body = res.fail(error, '删除失败');
  }
});

export default exampleRouter;
