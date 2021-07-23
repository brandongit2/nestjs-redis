import {Inject} from "@nestjs/common"

import {getRedisToken} from "./redis.utils"

export const InjectRedis = () => {
  return Inject(getRedisToken())
}
