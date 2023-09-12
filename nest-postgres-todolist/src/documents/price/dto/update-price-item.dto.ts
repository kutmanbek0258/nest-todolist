import { PartialType } from '@nestjs/swagger';
import { AddPriceItemDto } from './add-price-item.dto';

export class UpdatePriceItemDto extends PartialType(AddPriceItemDto) {}
