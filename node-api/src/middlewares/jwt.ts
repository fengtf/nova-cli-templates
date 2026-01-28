import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import { secret, expiresIn } from '@/config/config.json';
import Resolve from '@/lib/helper';
import { getLoginUrl } from '@/core/oidc';

const res = new Resolve();

// JWT自动刷新中间件
export const autoRefreshToken = async (ctx: Context, next: Next) => {
  const token = ctx.get('Authorization').split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
      // 检查JWT是否即将过期（距离过期时间小于5分钟）
      if (
        typeof decoded === 'object' &&
        decoded.exp &&
        decoded.exp < Date.now() / 1000 + 300
      ) {
        // 刷新JWT
        const newToken = jwt.sign(
          { name: decoded.name, id: decoded.id, nickname: decoded.nickname, avatar: decoded.avatar, },
          secret,
          {
            expiresIn,
          }
        );
        ctx.set('Authorization', `Bearer ${newToken}`); // 将新的JWT设置在响应头中
      }
      ctx.state.user = decoded;
    } catch (error) {
      // 如果JWT无效或过期，返回401错误
      ctx.status = 401;
      // ctx.redirect(url);
      ctx.body = res.fail(
        { jumpUrl: getLoginUrl() },
        '登录已过期，请重新登录',
        10002
      );
      return;
    }
  } else {
    ctx.status = 401;
    ctx.body = res.fail(
      { jumpUrl: getLoginUrl() },
      'Authorization不能为空',
      10002
    );
    return;
  }
  await next();
};
