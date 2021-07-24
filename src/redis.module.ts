import {DynamicModule, Global, Module} from "@nestjs/common"
import IORedis from "ioredis"

import {REDIS_TOKEN} from "./redis.constants"

@Global()
@Module({})
export class RedisModule {
  static register(config: IORedis.RedisOptions): DynamicModule {
    const RedisProvider = {
      provide: REDIS_TOKEN,
      useFactory: () => {
        return new IORedis(config)
      },
    }

    return {
      module: RedisModule,
      providers: [RedisProvider],
      exports: [RedisProvider],
    }
  }
}
