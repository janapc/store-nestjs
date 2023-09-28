import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { StatusOrder } from './enum/statusOrder.enum';
import UserEntity from '../user/user.entity';
import OrderItemEntity from './orderItem.entity';

@Entity({ name: 'orders' })
export default class OrderEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'amount', type: 'decimal', nullable: false })
	amount: number;

	@Column({ name: 'status', enum: StatusOrder, nullable: false })
	status: StatusOrder;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: string;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: string;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: string;

	@ManyToOne(() => UserEntity, (user) => user.orders)
	user: UserEntity;

	@OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
		cascade: true,
	})
	orderItems: OrderItemEntity[];
}
