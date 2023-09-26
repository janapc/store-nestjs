import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailExists } from '../validation/emailExists.validator';

export default class CreateUserDTO {
	@IsNotEmpty({ message: 'O campo name não pode ser vazio' })
	name: string;

	@IsEmail(undefined, { message: 'O campo email informado é inválido' })
	@EmailExists({ message: 'já existe um usuário com esse email' })
	email: string;

	@MinLength(6, {
		message: 'O campo password precisa ter pelo menos 6 caractéres',
	})
	@IsNotEmpty({ message: 'O campo password não pode ser vazio' })
	password: string;
}
