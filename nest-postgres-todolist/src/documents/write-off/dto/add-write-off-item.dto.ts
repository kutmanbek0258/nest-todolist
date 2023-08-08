import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddWriteOffItemDto {
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
