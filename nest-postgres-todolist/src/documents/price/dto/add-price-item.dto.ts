import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddPriceItemDto {
  @IsNotEmpty()
  @IsNumber()
  priceID: number;

  @IsNotEmpty()
  @IsNumber()
  productID: number;

  @IsNotEmpty()
  @IsNumber()
  retail_price: number;
}
