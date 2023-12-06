import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class OpenShiftDto {
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  status: number;

  @IsNotEmpty()
  @IsNumber()
  posId: number;

  @IsNotEmpty()
  @IsNumber()
  cashRegisterId: number;
}
