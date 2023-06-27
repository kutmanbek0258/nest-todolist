import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProductGroupDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  name: string;

  @IsString()
  description: string;
}
