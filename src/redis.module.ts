import {DynamicModule, Global, Module, Provider} from "@nestjs/common"
import IORedis from "ioredis"

import {REDIS_OPTIONS_TOKEN, REDIS_TOKEN} from "./redis.constants"
import {RedisModuleOptions, RedisModuleOptionsFactory} from "./redis.interfaces"

@Global()
@Module({})
export class RedisModule {
  static register(options: IORedis.RedisOptions): DynamicModule {
    const RedisProvider = {
      provide: REDIS_TOKEN,
      useFactory: () => {
        return new IORedis(options)
      },
    }

    return {
      module: RedisModule,
      providers: [RedisProvider],
      exports: [RedisProvider],
    }
  }

  static registerAsync(options: RedisModuleOptions): DynamicModule {
    if (options.useFactory) {
      const RedisOptionsProvider: Provider = {
        provide: REDIS_OPTIONS_TOKEN,
        useFactory: options.useFactory,
        inject: options.inject,
      }

      const RedisProvider: Provider = {
        provide: REDIS_TOKEN,
        useFactory: (options: IORedis.RedisOptions) => {
          return new IORedis(options)
        },
        inject: [REDIS_OPTIONS_TOKEN],
      }

      return {
        module: RedisModule,
        providers: [RedisOptionsProvider, RedisProvider],
        exports: [RedisProvider],
      }
    } else if (options.useClass) {
      const RedisOptionsProvider: Provider = {
        provide: REDIS_OPTIONS_TOKEN,
        useFactory: async (optionsFactory: RedisModuleOptionsFactory) => {
          return await optionsFactory.createRedisModuleOptions()
        },
        inject: [options.useExisting || options.useClass],
      }

      const RedisProvider: Provider = {
        provide: REDIS_TOKEN,
        useFactory: (options: IORedis.RedisOptions) => {
          return new IORedis(options)
        },
        inject: [REDIS_OPTIONS_TOKEN],
      }

      return {
        module: RedisModule,
        providers: [RedisOptionsProvider, {provide: options.useClass, useClass: options.useClass}, RedisProvider],
        exports: [RedisProvider],
      }
    } else if (options.useExisting) {
      const RedisOptionsProvider: Provider = {
        provide: REDIS_OPTIONS_TOKEN,
        useFactory: async (optionsFactory: RedisModuleOptionsFactory) => {
          return await optionsFactory.createRedisModuleOptions()
        },
        inject: [options.useExisting || options.useClass],
      }

      const RedisProvider: Provider = {
        provide: REDIS_TOKEN,
        useFactory: (options: IORedis.RedisOptions) => {
          return new IORedis(options)
        },
        inject: [REDIS_OPTIONS_TOKEN],
      }

      return {
        module: RedisModule,
        providers: [RedisOptionsProvider, RedisProvider],
        exports: [RedisProvider],
      }
    }
  }
}
