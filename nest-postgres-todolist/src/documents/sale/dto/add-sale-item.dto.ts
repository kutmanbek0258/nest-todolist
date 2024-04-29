import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddSaleItemDto {
  @IsNumber()
  @IsNotEmpty()
  saleID: number;

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
