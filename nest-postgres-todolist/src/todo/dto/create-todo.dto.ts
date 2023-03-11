import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { Exclude } from 'class-transformer';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly name: string;

  readonly description: string;

  @Exclude()
  owner: User;
}
