import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import CreateProductDTO from './dto/createProduct.dto';
import { ProductService } from './product.service';
import ProductEntity from './entities/product.entity';
import UpdateProductDTO from './dto/updateProduct.dto';

@Controller('/product')
export default class ProductController {
	constructor(private productService: ProductService) {}

	@Post()
	async createProduct(@Body() data: CreateProductDTO) {
		const product = new ProductEntity();
		Object.assign(product, data);
		await this.productService.create(product);
		return { message: 'produto cadastrado com sucesso', id: product.id };
	}

	@Get()
	async listProducts() {
		return this.productService.list();
	}

	@Put('/:id')
	async updateProduct(@Param('id') id: string, @Body() data: UpdateProductDTO) {
		const product = new ProductEntity();
		Object.assign(product, data);
		await this.productService.update(id, product);
		return { message: 'produto atualizado com sucesso', id };
	}

	@Delete('/:id')
	async deleteProduct(@Param('id') id: string) {
		await this.productService.delete(id);
		return { message: 'produto deletado com sucesso', id };
	}
}
