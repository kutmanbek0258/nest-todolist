import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddCheckItemDto {
  @IsNumber()
  @IsNotEmpty()
  checkID: number;

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
