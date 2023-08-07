import { Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { ShopModule } from '../../references/shop/shop.module';
import { DepotModule } from '../../references/depot/depot.module';
import { SupplierModule } from '../../references/supplier/supplier.module';
import { ProductModule } from '../../references/product/product.module';
import { ReceiptItem } from './entities/receipt-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Receipt, ReceiptItem]),
    ShopModule,
    DepotModule,
    SupplierModule,
    ProductModule,
  ],
  controllers: [ReceiptController],
  providers: [ReceiptService],
})
export class ReceiptModule {}
