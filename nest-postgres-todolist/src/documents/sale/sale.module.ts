import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { ShiftModule } from '../shift/shift.module';
import { PosModule } from '../../references/pos/pos.module';
import { SalesmanModule } from '../../references/salesman/salesman.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale]),
    ShiftModule,
    PosModule,
    SalesmanModule,
  ],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
