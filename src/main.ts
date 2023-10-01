import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);
	useContainer(app.select(AppModule), { fallbackOnErrors: true });
	const config = new DocumentBuilder()
		.setTitle('API Order, User and Product')
		.setDescription('The APIs to manager your store')
		.setVersion('1.0')
		.addTag('user-order-product')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	await app.listen(3000);
}
bootstrap();
