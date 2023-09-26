import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProductEntity from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity)
		private readonly productRepository: Repository<ProductEntity>,
	) {}

	async list() {
		const result = await this.productRepository.find();
		return result;
	}

	async create(product: ProductEntity) {
		await this.productRepository.save(product);
	}

	async findById(id: string) {
		return this.productRepository.findOneBy({
			id,
		});
	}

	async update(id: string, product: ProductEntity) {
		const hasProduct = await this.findById(id);
		if (!hasProduct) throw new Error('Produto não existe');
		await this.productRepository.update(id, product);
	}

	async delete(id: string) {
		const hasProduct = await this.findById(id);
		if (!hasProduct) throw new Error('Produto não existe');
		await this.productRepository.delete(id);
	}
}
