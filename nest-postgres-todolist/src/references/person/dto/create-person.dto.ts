import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  full_name: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  address: string;
}
