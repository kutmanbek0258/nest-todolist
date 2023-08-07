import { PartialType } from '@nestjs/swagger';
import { AddReceiptItemDto } from './add-receipt-item.dto';

export class UpdateReceiptItemDto extends PartialType(AddReceiptItemDto) {}
