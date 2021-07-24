"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RedisModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const redis_constants_1 = require("./redis.constants");
let RedisModule = RedisModule_1 = class RedisModule {
    static register(config) {
        const RedisProvider = {
            provide: redis_constants_1.REDIS_TOKEN,
            useFactory: () => {
                return new ioredis_1.default(config);
            },
        };
        return {
            module: RedisModule_1,
            providers: [RedisProvider],
            exports: [RedisProvider],
        };
    }
};
RedisModule = RedisModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], RedisModule);
exports.RedisModule = RedisModule;
