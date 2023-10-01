import {
	ClassSerializerInterceptor,
	ConsoleLogger,
	Module,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { UserModule } from './user/user.module';
import { PostgresConfig } from './config/postgres.config';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { FilterExceptionGlobal } from './filters/FilterExceptionGlobal';
import { AuthenticationModule } from './authentication/authentication.module';
import { LoggerGlobalInterceptor } from './logger-global/logger-global.interceptor';

@Module({
	imports: [
		UserModule,
		ProductModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			useClass: PostgresConfig,
			inject: [PostgresConfig],
		}),
		OrderModule,
		CacheModule.registerAsync({
			useFactory: async () => ({
				store: await redisStore({ ttl: 3600 * 1000 }),
			}),
			isGlobal: true,
		}),
		AuthenticationModule,
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: FilterExceptionGlobal,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggerGlobalInterceptor,
		},
		ConsoleLogger,
	],
})
export class AppModule {}
