import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, ListUsersDTO, UpdateUserDTO } from './dto';
import UserEntity from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	async list() {
		const result = await this.userRepository.find();
		const users = result.map((user) => new ListUsersDTO(user.id, user.email));
		return users;
	}

	async save(user: CreateUserDTO) {
		const userEntity = new UserEntity();
		Object.assign(userEntity, user as UserEntity);
		return this.userRepository.save(userEntity);
	}

	async findById(id: string) {
		const user = await this.userRepository.findOneBy({
			id,
		});
		if (!user) throw new NotFoundException('Usuário não encontrado');
		return user;
	}

	async findByEmail(email: string) {
		const user = await this.userRepository.findOneBy({
			email,
		});
		return user;
	}

	async update(id: string, user: UpdateUserDTO) {
		const userEntity = await this.findById(id);
		Object.assign(userEntity, user as UserEntity);
		await this.userRepository.save(userEntity);
	}

	async delete(id: string) {
		await this.findById(id);
		await this.userRepository.delete(id);
	}
}
