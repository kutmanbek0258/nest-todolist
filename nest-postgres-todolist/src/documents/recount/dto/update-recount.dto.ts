import { PartialType } from '@nestjs/swagger';
import { CreateRecountDto } from './create-recount.dto';

export class UpdateRecountDto extends PartialType(CreateRecountDto) {}
