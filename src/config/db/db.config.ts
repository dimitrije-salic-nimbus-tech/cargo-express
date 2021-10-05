import mongoose from 'mongoose';
import { environmentConfig } from '../env/env.config';

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(getMongoUrl(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set('debug', true);
  } catch (err) {
    console.log(err);
    process.exit(1); //if error with database connection, exit the whole process with code 1
  }
};

const getMongoUrl = (): string => {
  if (environmentConfig.mongo.useAtlas) {
    return `mongodb+srv://${environmentConfig.mongo.user}:${environmentConfig.mongo.password}@${environmentConfig.mongo.host}/${environmentConfig.mongo.database}?retryWrites=true&w=majority`;
  }
  return `mongodb://${environmentConfig.mongo.host}:${environmentConfig.mongo.port}/${environmentConfig.mongo.database}`;
};
