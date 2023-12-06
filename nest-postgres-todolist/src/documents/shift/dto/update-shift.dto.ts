import { PartialType } from '@nestjs/swagger';
import { OpenShiftDto } from './open-shift.dto';

export class UpdateShiftDto extends PartialType(OpenShiftDto) {}
