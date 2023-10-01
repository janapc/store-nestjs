import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OrderEntity from './order.entity';
import { In, Repository } from 'typeorm';
import UserEntity from '../user/user.entity';
import { StatusOrder } from './enum/statusOrder.enum';
import { CreateOrderDTO } from './dto/createOrder.dto';
import OrderItemEntity from './orderItem.entity';
import ProductEntity from '../product/entities/product.entity';
import { UpdateOrderDTO } from './dto/updateOrder.dto';

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(OrderEntity)
		private readonly orderRepository: Repository<OrderEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(ProductEntity)
		private readonly productRepository: Repository<ProductEntity>,
	) {}

	private async findUserById(id: string) {
		const user = await this.userRepository.findOneBy({ id });
		if (!user) throw new NotFoundException('Usuário não encontrado');
		return user;
	}

	private handlerDataOrder(
		data: CreateOrderDTO,
		productsRelated: ProductEntity[],
	) {
		data.orderItems.forEach((orderItem) => {
			const productRelated = productsRelated.find(
				(product) => product.id === orderItem.productId,
			);
			if (!productRelated) {
				throw new NotFoundException(
					`O produto ${orderItem.productId} não foi encontrado`,
				);
			}
			if (orderItem.quantity > productRelated.quantityAvailable) {
				throw new BadRequestException(
					`A quantidade solicidata (${orderItem.quantity}) é maior do que a disponível(${productRelated.quantityAvailable}) para o produto ${productRelated.name}`,
				);
			}
		});
	}

	async createOrder(userId: string, data: CreateOrderDTO) {
		const user = await this.findUserById(userId);

		const productIds = data.orderItems.map((orderItem) => orderItem.productId);
		const productsRelated = await this.productRepository.findBy({
			id: In(productIds),
		});
		const orderEntity = new OrderEntity();
		orderEntity.status = StatusOrder.EM_PROCESSAMENTO;
		orderEntity.user = user;
		this.handlerDataOrder(data, productsRelated);
		const orderItemsEntities = data.orderItems.map((orderItem) => {
			const productRelated = productsRelated.find(
				(product) => product.id === orderItem.productId,
			);

			const orderItemEntity = new OrderItemEntity();
			orderItemEntity.product = productRelated!;
			orderItemEntity.salePrice = productRelated!.price;
			orderItemEntity.quantity = orderItem.quantity;
			orderItemEntity.product.quantityAvailable -= orderItem.quantity;
			return orderItemEntity;
		});
		const amount = orderItemsEntities.reduce((prev, current) => {
			return prev + current.salePrice * current.quantity;
		}, 0);
		orderEntity.orderItems = orderItemsEntities;
		orderEntity.amount = amount;
		const order = await this.orderRepository.save(orderEntity);
		return order;
	}

	async listOrdersByUserId(userId: string) {
		return this.orderRepository.find({
			where: {
				user: { id: userId },
			},
			relations: {
				user: true,
			},
		});
	}

	private async findById(orderId: string) {
		const order = await this.orderRepository.findOne({
			where: { id: orderId },
			relations: { user: true },
		});
		if (!order) throw new NotFoundException('O pedido não foi encontrado');
		return order;
	}

	async updateOrder(userId: string, orderId: string, order: UpdateOrderDTO) {
		const orderEntity = await this.findById(orderId);
		if (orderEntity.user.id !== userId) {
			throw new ForbiddenException(
				'Você não tem autorização para atualizar esse pedido',
			);
		}
		Object.assign(orderEntity, order as OrderEntity);
		await this.orderRepository.save(orderEntity);
	}
}
