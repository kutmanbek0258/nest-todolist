import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  @IsNumber()
  personID: number;

  @IsNotEmpty()
  @IsNumber()
  companyID: number;
}
