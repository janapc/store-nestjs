import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserController from './user.controller';
import { UserService } from './user.service';
import UserEntity from './user.entity';
import { EmailExistsValidator } from './validation/emailExists.validator';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [UserController],
	providers: [EmailExistsValidator, UserService],
})
export class UserModule {}
