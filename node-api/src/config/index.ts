import path from 'path';
import detenv from 'dotenv';

interface IPathMap {
  dev: string;
  prod: string;
}
const envPathMap: IPathMap = {
  dev: path.resolve(__dirname, '../../.env.development'),
  prod: path.resolve(__dirname, '../../.env.production'),
};
const env = process.env.CURRENT_ENV ?? 'dev';

const dotenvConfig = detenv.config({ path: envPathMap[env as keyof IPathMap] });

export default dotenvConfig;
