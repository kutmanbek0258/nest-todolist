import { PartialType } from '@nestjs/swagger';
import { AddReceiptItemDto } from './add-receipt-item.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateReceiptItemDto {
  @IsNumber()
  @IsNotEmpty()
  productID: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
