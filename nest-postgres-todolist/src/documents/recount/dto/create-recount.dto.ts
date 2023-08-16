import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRecountDto {
  @IsNotEmpty()
  @IsNumber()
  shopID: number;

  @IsNotEmpty()
  @IsNumber()
  depotID: number;

  @IsNotEmpty()
  @IsNumber()
  status: number;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;
}
