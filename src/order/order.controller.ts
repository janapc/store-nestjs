import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/createOrder.dto';
import { UpdateOrderDTO } from './dto/updateOrder.dto';
import {
	AuthenticationGuard,
	RequestUser,
} from '../authentication/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	async createOrder(@Req() req: RequestUser, @Body() data: CreateOrderDTO) {
		const userId = req.user.sub;
		const order = await this.orderService.createOrder(userId, data);
		return order;
	}

	@Get()
	async listOrdersByUserId(@Req() req: RequestUser) {
		const userId = req.user.sub;
		const orders = await this.orderService.listOrdersByUserId(userId);
		return orders;
	}

	@Patch('/:id')
	async updateOrder(
		@Param('id') orderId: string,
		@Body() data: UpdateOrderDTO,
		@Req() req: RequestUser,
	) {
		const userId = req.user.sub;
		await this.orderService.updateOrder(userId, orderId, data);
		return { id: orderId, message: 'pedido atualizado com sucesso' };
	}
}
