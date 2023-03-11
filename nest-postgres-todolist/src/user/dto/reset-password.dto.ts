import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class ResetPasswordDto {
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
