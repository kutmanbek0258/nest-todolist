import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePriceItemDto {
  @IsNotEmpty()
  @IsNumber()
  productID: number;

  @IsNotEmpty()
  @IsNumber()
  retail_price: number;
}
