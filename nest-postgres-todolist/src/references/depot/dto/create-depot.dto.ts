import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDepotDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  companyID: number;

  @IsNotEmpty()
  @IsNumber()
  managerID: number;
}
