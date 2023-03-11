import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User full name',
    minimum: 5,
    maximum: 25,
    type: String,
    example: 'Kutman Smanov',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  readonly fullName: string;

  @ApiProperty({
    description: 'User email',
    minimum: 5,
    maximum: 255,
    type: String,
    example: 'smaovkutman0258@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'User password',
    minimum: 5,
    maximum: 1024,
    type: String,
    example: '$manov',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  readonly password: string;
}
