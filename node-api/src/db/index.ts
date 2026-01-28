import mongoose from 'mongoose';
import { mongodb as mongodbConfig } from '@/config/config.json';

mongoose.connect(getMongoUrl()).then(() => {
  console.log('mongodb client connected');
});

function getMongoUrl() {
  if (mongodbConfig.username && mongodbConfig.password) {
    return `mongodb://${mongodbConfig.username}:${mongodbConfig.password}@${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.dbName}?authSource=admin`;
  } else {
    return `mongodb://${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.dbName}`;
  }
}
