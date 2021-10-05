import { environmentConfig } from '../config/env/env.config';

export const getPagination = (page: number) => ({
  offset: page * environmentConfig.limit - environmentConfig.limit,
  limit: environmentConfig.limit,
});
