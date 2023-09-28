import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProductEntity from './entities/product.entity';
import CreateProductDTO from './dto/createProduct.dto';
import UpdateProductDTO from './dto/updateProduct.dto';

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

	async create(product: CreateProductDTO) {
		const productEntity = new ProductEntity();
		Object.assign(productEntity, product as ProductEntity);
		return this.productRepository.save(productEntity);
	}

	async findById(id: string) {
		const product = await this.productRepository.findOneBy({
			id,
		});
		if (!product) throw new NotFoundException('Produto não foi encontrado');
		return product;
	}

	async update(id: string, product: UpdateProductDTO) {
		const productEntity = await this.findById(id);
		Object.assign(productEntity, product as ProductEntity);
		await this.productRepository.save(productEntity);
	}

	async delete(id: string) {
		await this.findById(id);
		await this.productRepository.delete(id);
	}
}
