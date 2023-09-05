import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWriteOffDto {
  @IsNumber()
  @IsNotEmpty()
  shopID: number;

  @IsNumber()
  @IsNotEmpty()
  depotID: number;
}
