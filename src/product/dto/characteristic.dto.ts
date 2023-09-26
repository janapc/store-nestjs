import { IsNotEmpty } from 'class-validator';
import ProductEntity from '../entities/product.entity';

export default class CharacteristicDTO {
	id: string;
	product: ProductEntity;

	@IsNotEmpty({ message: 'O campo name não pode ser vazio' })
	name: string;

	@IsNotEmpty({ message: 'O campo description não pode ser vazio' })
	description: string;
}
