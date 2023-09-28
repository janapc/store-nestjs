import CreateUserDTO from './createUser.dto';
import { PartialType } from '@nestjs/mapped-types';

export default class UpdateUserDTO extends PartialType(CreateUserDTO) {}
