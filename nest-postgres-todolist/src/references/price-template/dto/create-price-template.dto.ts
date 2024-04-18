import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePriceTemplateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  name: string;

  description: string;

  @IsNumber()
  @IsNotEmpty()
  formula: number;
}
