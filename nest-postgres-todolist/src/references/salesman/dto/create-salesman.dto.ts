import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSalesmanDto {
  @IsNotEmpty()
  @IsNumber()
  companyID: number;

  @IsNotEmpty()
  @IsNumber()
  personID: number;
}
