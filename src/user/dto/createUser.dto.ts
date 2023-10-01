import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { EmailExists } from '../validation/emailExists.validator';

export default class CreateUserDTO {
	@IsNotEmpty({ message: 'O campo name não pode ser vazio' })
	name: string;

	@IsEmail(undefined, { message: 'O campo email informado é inválido' })
	@EmailExists({ message: 'já existe um usuário com esse email' })
	email: string;

	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, {
		message:
			'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
	})
	@IsNotEmpty({ message: 'O campo password não pode ser vazio' })
	password: string;
}
