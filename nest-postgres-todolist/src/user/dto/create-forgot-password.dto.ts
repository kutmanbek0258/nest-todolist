import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateForgotPasswordDto {
  @ApiProperty({
    description: 'User email',
    minimum: 5,
    maximum: 255,
    type: String,
    example: 'smanovkutman0258@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  readonly email: string;
}
