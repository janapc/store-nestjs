import {
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailExistsValidator implements ValidatorConstraintInterface {
	constructor(private userService: UserService) {}

	async validate(value: any): Promise<boolean> {
		const user = await this.userService.findByEmail(value);
		return !user;
	}
}

export const EmailExists = (optionsValidator: ValidationOptions) => {
	return (obj: object, property: string) => {
		registerDecorator({
			target: obj.constructor,
			propertyName: property,
			options: optionsValidator,
			constraints: [],
			validator: EmailExistsValidator,
		});
	};
};
