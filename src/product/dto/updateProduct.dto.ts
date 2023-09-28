import { PartialType } from '@nestjs/mapped-types';
import CreateProductDTO from './createProduct.dto';

export default class UpdateProductDTO extends PartialType(CreateProductDTO) {}
