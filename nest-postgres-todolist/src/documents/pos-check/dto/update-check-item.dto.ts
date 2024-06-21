import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCheckItemDto {
  @IsNumber()
  @IsNotEmpty()
  productID: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
