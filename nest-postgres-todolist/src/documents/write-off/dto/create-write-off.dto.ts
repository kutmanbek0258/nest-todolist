import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWriteOffDto {
  @IsNumber()
  @IsNotEmpty()
  supplierID: number;

  @IsNumber()
  @IsNotEmpty()
  shopID: number;

  @IsNumber()
  @IsNotEmpty()
  depotID: number;
}
