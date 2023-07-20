import { Injectable } from '@nestjs/common/decorators';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: process.env.SERVER_URL,
      dbName: process.env.DATEBASE_NAME,
    };
  }
}
