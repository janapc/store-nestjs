import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../user/user.module';
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [
		UserModule,
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => {
				return {
					secret: configService.get<string>('SECRET_JWT'),
					signOptions: { expiresIn: '72h' },
				};
			},
			inject: [ConfigService],
			global: true,
		}),
	],
	controllers: [AuthenticationController],
	providers: [AuthenticationService],
})
export class AuthenticationModule {}
