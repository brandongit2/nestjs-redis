import {DynamicModule, Module} from "@nestjs/common"
import IORedis from "ioredis"

import {getRedisToken} from "./redis.utils"

@Module({})
export class RedisModule {
  static register(config: IORedis.RedisOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: getRedisToken(),
          useValue: new IORedis(config),
        },
      ],
    }
  }
}
