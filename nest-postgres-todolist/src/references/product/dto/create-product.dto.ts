import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  name: string;

  @IsString()
  description: string;

  barcode: string;

  @IsNumber()
  @IsNotEmpty()
  groupID: number;

  @IsNumber()
  @IsNotEmpty()
  price_templateID: number;
}
