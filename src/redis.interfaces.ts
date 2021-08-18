import {Type} from "@nestjs/common"
import IORedis from "ioredis"

export type RedisModuleOptionsFactory = {
  createRedisModuleOptions(): IORedis.RedisOptions | Promise<IORedis.RedisOptions>
}

export type RedisModuleOptions = {
  inject?: any[]
  useFactory?: (...args: any[]) => IORedis.RedisOptions | Promise<IORedis.RedisOptions>
  useClass?: Type<RedisModuleOptionsFactory>
  useExisting?: Type<RedisModuleOptionsFactory>
}
