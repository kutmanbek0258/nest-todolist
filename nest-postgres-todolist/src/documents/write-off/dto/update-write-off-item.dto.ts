import { PartialType } from '@nestjs/swagger';
import { AddWriteOffItemDto } from './add-write-off-item.dto';

export class UpdateWriteOffItemDto extends PartialType(AddWriteOffItemDto) {}
