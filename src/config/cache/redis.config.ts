import { createClient, RedisClient } from 'redis';
import CacheKey from '../../shared/enums/cuntries.enum';

let redisClient: RedisClient | null = null;

export const connect = (): RedisClient => {
  if (redisClient) {
    //singleton
    return redisClient;
  }
  try {
    const redis = createClient(6379, 'localhost'); //levi iz docker-compose.yml
    console.log('Connected to redis');

    redisClient = redis;
    return redisClient;
  } catch (err) {
    console.log(err);
    process.exit(1); //zaustavljamo app ako nesto ne valja jer to znaci da sigurno neka funkcionalnost ne valja
  }
};

const get = async <T>(key: CacheKey): Promise<T> => {
  //genericki primamo tip
  return new Promise((resolve, reject) => {
    tryToGetClient().get(key, (err, data) => {
      if (err) {
        reject(err);
      }

      // @ts-ignore
      const item = JSON.parse(data) as T;

      resolve(item);
    });
  });
};

const store = async <T>(key: CacheKey, item: T): Promise<T> => {
  if (await exist(key)) {
    //ako vec postoji ne treba nam novi set
    return item;
  }
  return new Promise((resolve, reject) => {
    tryToGetClient().set(key, JSON.stringify(item), (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(item as T);
    });
  });
};

const exist = async (key: CacheKey): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    tryToGetClient().exists(key, (err, data) => { // data jer je timestamp
      if (err) {
        reject(err);
      }
      resolve(!!data);
    });
  });
};

const remove = async (key: CacheKey): Promise<void> => {
  if (!(await exist(key))) {
    console.log('Already deleted');

    return;
  }
  return new Promise((resolve, reject) => {
    tryToGetClient().del(key, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

const tryToGetClient = (): RedisClient => {
  if (redisClient) {
    return redisClient;
  }
  return connect();
};

export const cacheServis = {
  get,
  store,
  exist,
  remove,
};
