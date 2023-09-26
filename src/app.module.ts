import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { PostgresConfig } from './config/postgres.config';
import { ProductModule } from './product/product.module';

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
	],
})
export class AppModule {}
