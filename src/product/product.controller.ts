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
import UpdateProductDTO from './dto/updateProduct.dto';

@Controller('/product')
export default class ProductController {
	constructor(private productService: ProductService) {}

	@Post()
	async createProduct(@Body() data: CreateProductDTO) {
		const product = await this.productService.create(data);
		return { id: product.id, message: 'produto cadastrado com sucesso' };
	}

	@Get()
	async listProducts() {
		return this.productService.list();
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
