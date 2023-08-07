import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddReceiptItemDto {
  @IsNumber()
  @IsNotEmpty()
  receiptID: number;

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
