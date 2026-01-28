import type { Context } from 'koa';
import jwt from 'jsonwebtoken';
import { secret } from '@/config/config.json';
import { CreateParams } from '@/dao/users';

function getTokenInfo(ctx: Context): CreateParams {
  const authorization = ctx.header.authorization as string;
  if (authorization) {
    const data = jwt.verify(authorization, secret);
    return data as CreateParams;
  }
  return {
    name: '',
    id: '',
    nickname: '',
    avatar: '',
  };
}

export default getTokenInfo;
