import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'One time verification code',
    minimum: 6,
    maximum: 6,
    type: Number,
    required: true,
    example: 435808,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly verification: number;
}
