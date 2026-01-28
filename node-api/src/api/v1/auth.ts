import Router from 'koa-router';
import Resolve from '@/lib/helper';
import jwt from 'jsonwebtoken';
import { autoRefreshToken } from '@/middlewares/jwt';

const res = new Resolve();

const authRouter = new Router({ prefix: '/api/v1/auth' });

// JWT 密钥 - 实际项目中应该从配置文件读取
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

/**
 * 示例：登录接口
 * 实际项目中应该验证用户名密码，这里仅作为示例
 */
authRouter.post('/login', async (ctx) => {
  try {
    const { username, password } = ctx.request.body;

    // TODO: 实际项目中应该验证用户名密码
    // 这里仅作为示例，直接生成 token
    if (!username || !password) {
      ctx.body = res.fail('', '用户名或密码不能为空');
      return;
    }

    // 生成用户信息
    const userInfo = {
      id: '1',
      username,
      name: '示例用户',
    };

    // 生成 JWT token
    const token = jwt.sign(userInfo, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    ctx.body = res.json({ token, userInfo });
  } catch (error: any) {
    ctx.body = res.fail(error, '登录失败');
  }
});

/**
 * 示例：获取当前用户信息（需要认证）
 */
authRouter.get('/userinfo', autoRefreshToken, (ctx) => {
  try {
    // autoRefreshToken 中间件会将用户信息存储在 ctx.state.user 中
    const user = ctx.state.user;
    ctx.body = res.json(user);
  } catch (error: any) {
    ctx.body = res.fail(error, '获取用户信息失败');
  }
});

/**
 * 示例：刷新 token（需要认证）
 */
authRouter.post('/refresh', autoRefreshToken, async (ctx) => {
  try {
    const user = ctx.state.user;
    
    // 生成新的 token
    const newToken = jwt.sign(user, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    ctx.body = res.json({ token: newToken });
  } catch (error: any) {
    ctx.body = res.fail(error, '刷新 token 失败');
  }
});

export default authRouter;
