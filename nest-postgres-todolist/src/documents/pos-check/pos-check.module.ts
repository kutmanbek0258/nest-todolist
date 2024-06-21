import { Module } from '@nestjs/common';
import { PosCheckService } from './pos-check.service';
import { PosCheckController } from './pos-check.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PosCheck } from './entities/pos-check.entity';
import { CheckItem } from './entities/check-item.entity';
import { ShiftModule } from '../shift/shift.module';
import { ProductModule } from '../../references/product/product.module';
import { PosModule } from '../../references/pos/pos.module';
import { SalesmanModule } from '../../references/salesman/salesman.module';
import { CashRegisterModule } from '../../references/cash-register/cash-register.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PosCheck, CheckItem]),
    ShiftModule,
    ProductModule,
    PosModule,
    CashRegisterModule,
    SalesmanModule,
  ],
  controllers: [PosCheckController],
  providers: [PosCheckService],
})
export class PosCheckModule {}
