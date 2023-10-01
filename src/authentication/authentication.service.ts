import * as bcrypt from 'bcrypt';

import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

export interface UserPayload {
	sub: string;
	username: string;
}

@Injectable()
export class AuthenticationService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async login(email: string, password: string) {
		const user = await this.userService.findByEmail(email);
		if (!user) throw new NotFoundException('Usuário não encontrado');
		const userAuth = await bcrypt.compare(password, user.password);
		if (!userAuth)
			throw new UnauthorizedException('O email ou password estão incorretos');

		const payload: UserPayload = {
			sub: user.id,
			username: user.name,
		};

		return {
			token: await this.jwtService.signAsync(payload),
		};
	}
}
