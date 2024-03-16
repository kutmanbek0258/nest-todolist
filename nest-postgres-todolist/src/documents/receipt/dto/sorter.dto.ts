import { IsNotEmpty, IsString } from 'class-validator';

export class SorterDto {
  @IsString()
  @IsNotEmpty()
  sortBy: string;

  @IsString()
  @IsNotEmpty()
  order: string;
}
