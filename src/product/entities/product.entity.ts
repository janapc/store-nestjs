import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import ProductCharacteristicEntity from './product-characteristic.entity';
import ProductImageEntity from './product-image.entity';
import OrderItemEntity from '../../order/orderItem.entity';

@Entity({ name: 'products' })
export default class ProductEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'name', length: 100, nullable: false })
	name: string;

	@Column({ name: 'price', type: 'decimal', nullable: false })
	price: number;

	@Column({ name: 'quantity_available', nullable: false })
	quantityAvailable: number;

	@Column({ name: 'description', length: 255, nullable: false })
	description: string;

	@Column({ name: 'category', length: 100, nullable: false })
	category: string;

	@OneToMany(() => ProductImageEntity, (productImage) => productImage.product, {
		cascade: true,
		eager: true,
	})
	images: ProductImageEntity[];

	@OneToMany(
		() => ProductCharacteristicEntity,
		(productCharacteristic) => productCharacteristic.product,
		{ cascade: true, eager: true },
	)
	characteristics: ProductCharacteristicEntity[];

	@CreateDateColumn({ name: 'created_at' })
	createdAt: string;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: string;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: string;

	@OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
	orderItems: OrderItemEntity[];
}
