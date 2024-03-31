import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateWriteOffItemDto {
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
