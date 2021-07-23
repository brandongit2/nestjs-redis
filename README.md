# @brandongit2/nestjs-redis

A NestJS module for using ioredis.

## Installation

```bash
yarn add nestjs-redis ioredis
```

## Examples

### RedisModule.register(config)

```ts
import {Module} from "@nestjs/common"
import {RedisModule} from "nestjs-redis"
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
import {Controller, Get} from "@nestjs/common"
import {InjectRedis, Redis} from "nestjs-redis"

@Controller()
export class AppController {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  @Get()
  async getSession(id: string) {
    const session = await this.redis.get(`sess:${id}`)
    return session
  }
}
```
