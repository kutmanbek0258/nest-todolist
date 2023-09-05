import { PartialType } from '@nestjs/swagger';
import { AddRecountItemDto } from './add-recount-item.dto';

export class UpdateRecountItemDto extends PartialType(AddRecountItemDto) {}
