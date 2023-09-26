import {
	Body,
	Controller,
	Post,
	Get,
	Put,
	Param,
	Delete,
} from '@nestjs/common';
import UserEntity from './user.entity';
import { UpdateUserDTO, CreateUserDTO } from './dto';
import { UserService } from './user.service';

@Controller('/user')
export default class UserController {
	constructor(private userService: UserService) {}

	@Post()
	async createUser(@Body() userDTO: CreateUserDTO) {
		const user = new UserEntity();
		user.email = userDTO.email;
		user.password = userDTO.password;
		user.name = userDTO.name;
		await this.userService.save(user);
		return { message: 'usuário cadastrado com sucesso', id: user.id };
	}

	@Get()
	async listUsers() {
		const result = await this.userService.list();
		return result;
	}

	@Put('/:id')
	async updateUser(@Param('id') id: string, @Body() data: UpdateUserDTO) {
		await this.userService.update(id, data);
		return {
			id,
			message: 'Usuário atualizado com sucesso',
		};
	}

	@Delete('/:id')
	async removeUser(@Param('id') id: string) {
		await this.userService.delete(id);
		return {
			id,
			message: 'Usuário foi removido com sucesso',
		};
	}
}
