import path from 'path';
import dotenv from 'dotenv';

interface IPathMap {
  dev: string;
  prod: string;
  test: string;
}

const envPathMap: IPathMap = {
  dev: path.resolve(__dirname, '../../.env.development'),
  prod: path.resolve(__dirname, '../../.env.production'),
  test: path.resolve(__dirname, '../../.env.test'),
};

const env = (process.env.CURRENT_ENV || 'dev') as keyof IPathMap;

// 加载环境变量
const dotenvConfig = dotenv.config({ path: envPathMap[env] });

if (dotenvConfig.error && env !== 'test') {
  console.warn(`警告: 无法加载环境变量文件 ${envPathMap[env]}`);
}

// 导出配置对象
export const config = {
  env,
  port: parseInt(process.env.SERVER_PORT || '3050', 10),
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '2h',
  },
  mongodb: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT ? parseInt(process.env.MONGODB_PORT, 10) : undefined,
    database: process.env.MONGODB_DATABASE,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : undefined,
    password: process.env.REDIS_PASSWORD,
  },
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

export default dotenvConfig;
