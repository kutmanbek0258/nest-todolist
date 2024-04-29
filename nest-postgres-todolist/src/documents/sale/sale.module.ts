import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { ShiftModule } from '../shift/shift.module';
import { PosModule } from '../../references/pos/pos.module';
import { SalesmanModule } from '../../references/salesman/salesman.module';
import { SaleItem } from './entities/sale-item.entity';
import { ProductModule } from '../../references/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, SaleItem]),
    ShiftModule,
    PosModule,
    SalesmanModule,
    ProductModule,
  ],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
