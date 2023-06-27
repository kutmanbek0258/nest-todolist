import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePriceTemplateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  name: string;

  description: string;

  @IsString()
  @IsNotEmpty()
  formula: string;
}
