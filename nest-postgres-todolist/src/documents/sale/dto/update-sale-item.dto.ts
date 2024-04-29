import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSaleItemDto {
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
