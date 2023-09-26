import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductController from './product.controller';
import { UserIdExistsValidator } from './validation/userIdExists.validator';
import { ProductService } from './product.service';
import ProductEntity from './entities/product.entity';
import { UserService } from 'src/user/user.service';
import UserEntity from 'src/user/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity])],
	controllers: [ProductController],
	providers: [ProductService, UserIdExistsValidator, UserService],
})
export class ProductModule {}
