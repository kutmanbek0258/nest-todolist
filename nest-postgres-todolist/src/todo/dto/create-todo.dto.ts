import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Todo task name',
    minimum: 2,
    maximum: 255,
    type: String,
    example: 'Clear laptop',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly name: string;

  @ApiProperty({
    description: 'Todo task description',
    type: String,
    example: 'Clear laptop, open laptop case clear cooler',
  })
  readonly description: string;

  @ApiProperty({
    description: 'Todo task owner id',
    type: Number,
    example: 1,
  })
  @Exclude()
  owner: User;
}
