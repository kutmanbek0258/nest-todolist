import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRecountDto {
  @IsNotEmpty()
  @IsNumber()
  shopID: number;

  @IsNotEmpty()
  @IsNumber()
  depotID: number;

  status: number;
}
