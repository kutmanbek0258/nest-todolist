import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReceiptDto {
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
