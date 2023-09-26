import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUsersDTO, UpdateUserDTO } from './dto';
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

	async save(user: UserEntity) {
		await this.userRepository.save(user);
	}

	async findById(id: string) {
		return this.userRepository.findOneBy({
			id,
		});
	}

	async findByEmail(email: string) {
		return this.userRepository.findOneBy({
			email,
		});
	}

	async update(id: string, user: UpdateUserDTO) {
		const hasUser = await this.findById(id);
		if (!hasUser) throw new Error('Usuário não existe');
		await this.userRepository.update(id, user);
	}

	async delete(id: string) {
		const hasUser = await this.findById(id);
		if (!hasUser) throw new Error('Usuário não existe');
		await this.userRepository.delete(id);
	}
}
