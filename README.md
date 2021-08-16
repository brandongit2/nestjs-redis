# @brandongit2/nestjs-redis

A NestJS module for using ioredis.

## Installation

```bash
yarn add @brandonnpm2/nestjs-redis ioredis
```

## Examples

### RedisModule.register(config)

```ts
import {RedisModule} from "@brandonnpm2/nestjs-redis"
import {Module} from "@nestjs/common"

import {AppController} from "./app.controller"

@Module({
  imports: [
    RedisModule.register({
      port: 6379,
      host: `127.0.0.1`,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### InjectRedis()

```ts
import {InjectRedis} from "@brandonnpm2/nestjs-redis"
import {Controller, Get, Param} from "@nestjs/common"

import type {Redis} from "ioredis"

@Controller()
export class AppController {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  @Get(`/something/:id`)
  async getSomething(@Param(`id`) id: string) {
    const something = await this.redis.get(id)
    return something
  }
}
```

### Mocking for tests

```ts
import {REDIS_TOKEN, RedisModule} from "@brandonnpm2/nestjs-redis"
import {Test} from "@nestjs/testing"

import type {Redis} from "ioredis"

describe(`test`, () => {
  let redis: Redis

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        RedisModule.register({
          port: 6379,
          host: `127.0.0.1`,
        }),
      ],
    })

    redis = module.get(REDIS_TOKEN)
  })

  beforeEach(async () => {
    await redis.flushall()
  })

  test(`basic test`, async () => {
    const FOO = `bar`

    await redis.set(`foo`, FOO)

    const res = await redis.get(`foo`)
    expect(res).toEqual(FOO)
  })
})
```
