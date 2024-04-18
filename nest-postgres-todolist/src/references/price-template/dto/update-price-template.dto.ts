import { PartialType } from '@nestjs/swagger';
import { CreatePriceTemplateDto } from './create-price-template.dto';

export class UpdatePriceTemplateDto extends PartialType(
  CreatePriceTemplateDto,
) {}
