import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindAllDto {
  query: string;

  @IsNotEmpty()
  @IsNumber()
  skip: number;

  @IsNotEmpty()
  @IsNumber()
  take: number;
}
