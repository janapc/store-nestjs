import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/createOrder.dto';
import { UpdateOrderDTO } from './dto/updateOrder.dto';

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	async createOrder(
		@Query('userId') userId: string,
		@Body() data: CreateOrderDTO,
	) {
		const order = await this.orderService.createOrder(userId, data);
		return order;
	}

	@Get()
	async listOrdersByUserId(@Query('userId') userId: string) {
		const orders = await this.orderService.listOrdersByUserId(userId);
		return orders;
	}

	@Patch('/:id')
	async updateOrder(
		@Param('id') orderId: string,
		@Body() data: UpdateOrderDTO,
	) {
		await this.orderService.updateOrder(orderId, data);
		return { id: orderId, message: 'pedido atualizado com sucesso' };
	}
}
