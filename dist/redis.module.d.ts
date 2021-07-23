import { DynamicModule } from "@nestjs/common";
import IORedis from "ioredis";
export declare class RedisModule {
    static register(config: IORedis.RedisOptions): DynamicModule;
}
