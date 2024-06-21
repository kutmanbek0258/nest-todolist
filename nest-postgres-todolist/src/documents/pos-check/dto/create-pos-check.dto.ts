import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePosCheckDto {
  @IsNumber()
  @IsNotEmpty()
  shiftID: number;

  @IsNumber()
  @IsNotEmpty()
  posID: number;

  @IsNumber()
  @IsNotEmpty()
  cashRegisterID: number;

  @IsNumber()
  @IsNotEmpty()
  salesmanID: number;
}
