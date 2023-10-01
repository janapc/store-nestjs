import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post,
	Put,
	UseInterceptors,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/cache-manager';
import CreateProductDTO from './dto/createProduct.dto';
import { ProductService } from './product.service';
import UpdateProductDTO from './dto/updateProduct.dto';
import ProductEntity from './entities/product.entity';

@Controller('/product')
export default class ProductController {
	constructor(
		private productService: ProductService,
		@Inject(CACHE_MANAGER) private managerCache: Cache,
	) {}

	@Post()
	async createProduct(@Body() data: CreateProductDTO) {
		const product = await this.productService.create(data);
		return { id: product.id, message: 'produto cadastrado com sucesso' };
	}

	@Get()
	@UseInterceptors(CacheInterceptor)
	async listProducts() {
		const products = await this.productService.list();
		return products;
	}

	@Get('/:id')
	async findProductById(@Param('id') id: string) {
		let product = await this.managerCache.get<ProductEntity>(`product-${id}`);
		if (!product) {
			product = await this.productService.findById(id);
			await this.managerCache.set(`product-${id}`, product);
		}
		return {
			product,
			message: 'produto encontrado',
		};
	}

	@Put('/:id')
	async updateProduct(@Param('id') id: string, @Body() data: UpdateProductDTO) {
		await this.productService.update(id, data);
		return { id, message: 'produto atualizado com sucesso' };
	}

	@Delete('/:id')
	async deleteProduct(@Param('id') id: string) {
		await this.productService.delete(id);
		return { id, message: 'produto deletado com sucesso' };
	}
}
