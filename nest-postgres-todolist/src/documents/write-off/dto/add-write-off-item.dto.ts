import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddWriteOffItemDto {
  @IsNumber()
  @IsNotEmpty()
  writeOffID: number;

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
