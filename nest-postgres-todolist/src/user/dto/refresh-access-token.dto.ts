import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshAccessTokenDto {
  @ApiProperty({
    description: 'Refresh token',
    type: String,
    minLength: 36,
    maxLength: 36,
    required: true,
    example: 'ee95c24b-c60f-4ea1-be59-9f9def134516',
  })
  @IsNotEmpty()
  @IsUUID()
  readonly refreshToken: string;
}
