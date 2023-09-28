import {
	Body,
	Controller,
	Post,
	Get,
	Put,
	Param,
	Delete,
} from '@nestjs/common';
import { UpdateUserDTO, CreateUserDTO } from './dto';
import { UserService } from './user.service';

@Controller('/user')
export default class UserController {
	constructor(private userService: UserService) {}

	@Post()
	async createUser(@Body() userDTO: CreateUserDTO) {
		const user = await this.userService.save(userDTO);
		return { id: user.id, message: 'usuário cadastrado com sucesso' };
	}

	@Get()
	async listUsers() {
		const result = await this.userService.list();
		return result;
	}

	@Put('/:id')
	async updateUser(@Param('id') id: string, @Body() userDTO: UpdateUserDTO) {
		await this.userService.update(id, userDTO);
		return {
			id,
			message: 'Usuário atualizado com sucesso',
		};
	}

	@Delete('/:id')
	async deleteUser(@Param('id') id: string) {
		await this.userService.delete(id);
		return {
			id,
			message: 'Usuário foi removido com sucesso',
		};
	}
}
