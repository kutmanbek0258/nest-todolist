import { Module } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { ShiftController } from './shift.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';
import { PosModule } from '../../references/pos/pos.module';
import { CashRegisterModule } from '../../references/cash-register/cash-register.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shift]), PosModule, CashRegisterModule],
  controllers: [ShiftController],
  providers: [ShiftService],
  exports: [ShiftService],
})
export class ShiftModule {}
