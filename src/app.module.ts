import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { PostgresConfig } from './config/postgres.config';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { FilterExceptionGlobal } from './filters/FilterExceptionGlobal';

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
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: FilterExceptionGlobal,
		},
	],
})
export class AppModule {}
