import { Type } from 'class-transformer';
import {
	IsArray,
	IsInt,
	IsNumber,
	IsOptional,
	IsUUID,
	ValidateNested,
} from 'class-validator';
import ImageDTO from './image.dto';
import CharacteristicDTO from './characteristic.dto';
import { UserIdExists } from '../validation/userIdExists.validator';

export default class UpdateProductDTO {
	@IsOptional()
	name: string;

	@IsNumber(undefined, { message: 'O campo price é do tipo numero' })
	@IsOptional()
	price: number;

	@IsInt({ message: 'O campo quantityAvailable é do tipo numero' })
	@IsOptional()
	quantityAvailable: number;

	@IsOptional()
	description: string;

	@ValidateNested()
	@IsArray()
	@Type(() => ImageDTO)
	@IsOptional()
	images: ImageDTO[];

	@IsOptional()
	category: string;

	@IsUUID()
	@UserIdExists({ message: 'usuário não encontrado' })
	@IsOptional()
	userId: string;

	@ValidateNested()
	@IsArray()
	@Type(() => CharacteristicDTO)
	@IsOptional()
	characteristics: CharacteristicDTO[];
}
