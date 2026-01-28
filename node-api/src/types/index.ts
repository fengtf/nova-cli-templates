// 导出所有类型定义
export * from './common';
export * from './enums';

// Koa Context 类型扩展
import { Context } from 'koa';

export interface IUserInfo {
  id: string;
  username: string;
  name: string;
  email?: string;
  avatar?: string;
  roles?: string[];
}

declare module 'koa' {
  interface DefaultState {
    user?: IUserInfo;
  }
  interface DefaultContext {
    // 可以在这里扩展 Context 类型
  }
}
