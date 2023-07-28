import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCashRegisterDto {
  @IsNotEmpty()
  @IsNumber()
  shopID: number;

  @IsNotEmpty()
  @IsNumber()
  posID: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(200)
  ofd: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(200)
  printer: string;
}
