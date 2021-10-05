import * as dotEnv from 'dotenv';
import { useAtlas, isDevEnv } from '../../utils/env.utils';

dotEnv.config();

type ServiceEnvironment = {
  serviceName: string;
  port: Number;
  apiSalt: number;
  isDev: boolean;
  jwtSecret: string;
  limit: number;
  mongo: {
    user: string;
    password: string;
    host: string;
    port: number;
    database: string;
    useAtlas: boolean;
  };
};
export const environmentConfig: ServiceEnvironment = {
  serviceName: process.env.SERVICE_NAME || 'Nucleus-Mongo-Express-Boilerplate',
  port: +(process.env.SERVICE_PORT || 3000),
  apiSalt: +(process.env.API_SALT || 10),
  isDev: isDevEnv(process.env.IS_DEV)!,
  jwtSecret: process.env.JWT_SECRET || 'SuperCoolSecret123!',
  limit: +(process.env.LIMIT || 10),
  mongo: {
    user: process.env.MONGO_USER || 'Please enter mongo user',
    password: process.env.MONGO_PASSWORD || 'Please enter mongo password',
    host: process.env.MONGO_HOST || 'localhost',
    port: +(process.env.MONGO_PORT || 27017),
    database: process.env.MONGO_DATABASE || 'Please enter database name',
    useAtlas: useAtlas(process.env.IS_ATLAS)!,
  },
};
// eslint-disable-next-line no-unused-expressions
environmentConfig.isDev && console.log(environmentConfig);
