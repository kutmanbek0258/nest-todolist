import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateShopDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  name: string;

  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  companyID: number;

  @IsNotEmpty()
  @IsNumber()
  managerID: number;

  @IsNotEmpty()
  @IsNumber()
  depotID: number;
}
