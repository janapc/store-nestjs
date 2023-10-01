import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationDto } from './dto/authentication.dto';

@Controller('authentication')
export class AuthenticationController {
	constructor(private readonly authenticationService: AuthenticationService) {}

	@Post('login')
	async login(@Body() { email, password }: AuthenticationDto) {
		const token = await this.authenticationService.login(email, password);
		return token;
	}
}
