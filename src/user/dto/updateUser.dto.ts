import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { EmailExists } from '../validation/emailExists.validator';

export default class UpdateUserDTO {
	@IsOptional()
	name: string;

	@IsEmail(undefined, { message: 'O campo email informado é inválido' })
	@EmailExists({ message: 'já existe um usuário com esse email' })
	@IsOptional()
	email: string;

	@MinLength(6, {
		message: 'O campo password precisa ter pelo menos 6 caractéres',
	})
	@IsOptional()
	password: string;
}
