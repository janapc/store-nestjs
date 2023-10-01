import * as bcrypt from 'bcrypt';
import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HashPassword implements PipeTransform {
	constructor(private configService: ConfigService) {}

	async transform(password: string) {
		const salt = this.configService.get<string>('SALT_PASSWORD');
		const hashPassword = await bcrypt.hash(password, salt!);
		return hashPassword;
	}
}
