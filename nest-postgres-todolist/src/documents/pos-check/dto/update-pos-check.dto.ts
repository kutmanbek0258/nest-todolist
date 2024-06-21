import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdatePosCheckDto {
  @IsBoolean()
  @IsNotEmpty()
  isHold: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isArchive: boolean;
}
