import {
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserIdExistsValidator implements ValidatorConstraintInterface {
	constructor(private userService: UserService) {}

	async validate(value: any): Promise<boolean> {
		const user = await this.userService.findById(value);
		return !!user;
	}
}

export const UserIdExists = (optionsValidator: ValidationOptions) => {
	return (obj: object, property: string) => {
		registerDecorator({
			target: obj.constructor,
			propertyName: property,
			options: optionsValidator,
			constraints: [],
			validator: UserIdExistsValidator,
		});
	};
};
