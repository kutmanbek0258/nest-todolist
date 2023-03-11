import { IsNotEmpty,  IsNumber,  IsUUID } from 'class-validator';

export class VerifyUuidDto {
    @IsNotEmpty()
    @IsNumber()
    readonly verification: number;
}
