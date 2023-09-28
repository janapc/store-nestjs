import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import OrderEntity from './order.entity';
import ProductEntity from 'src/product/entities/product.entity';

@Entity({ name: 'order_items' })
export default class OrderItemEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'quantity', nullable: false })
	quantity: number;

	@Column({ name: 'sale_price', type: 'decimal', nullable: false })
	salePrice: number;

	@ManyToOne(() => OrderEntity, (order) => order.orderItems, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	order: OrderEntity;

	@ManyToOne(() => ProductEntity, (order) => order.orderItems, {
		cascade: ['update'],
	})
	product: ProductEntity;
}
