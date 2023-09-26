import { Type } from 'class-transformer';
import {
	IsArray,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsUUID,
	ValidateNested,
} from 'class-validator';
import ImageDTO from './image.dto';
import CharacteristicDTO from './characteristic.dto';
import { UserIdExists } from '../validation/userIdExists.validator';

export default class CreateProductDTO {
	@IsNotEmpty({ message: 'O campo name não pode ser vazio' })
	name: string;

	@IsNotEmpty({ message: 'O campo price não pode ser vazio' })
	@IsNumber(undefined, { message: 'O campo price é do tipo numero' })
	price: number;

	@IsNotEmpty({ message: 'O campo quantityAvailable não pode ser vazio' })
	@IsInt({ message: 'O campo quantityAvailable é do tipo numero' })
	quantityAvailable: number;

	@IsNotEmpty({ message: 'O campo description não pode ser vazio' })
	description: string;

	@ValidateNested()
	@IsArray()
	@Type(() => ImageDTO)
	images: ImageDTO[];

	@IsNotEmpty({ message: 'O campo category não pode ser vazio' })
	category: string;

	@IsNotEmpty({ message: 'O campo userId não pode ser vazio' })
	@IsUUID()
	@UserIdExists({ message: 'usuário não encontrado' })
	userId: string;

	@ValidateNested()
	@IsArray()
	@Type(() => CharacteristicDTO)
	characteristics: CharacteristicDTO[];
}
