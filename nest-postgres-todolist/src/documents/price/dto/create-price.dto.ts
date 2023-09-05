import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePriceDto {
  @IsNotEmpty()
  @IsNumber()
  shopID: number;
}
