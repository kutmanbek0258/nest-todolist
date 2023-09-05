import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddRecountItemDto {
  @IsNumber()
  @IsNotEmpty()
  recountID: number;

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
