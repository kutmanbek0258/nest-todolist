import { Module } from '@nestjs/common';
import { RecountService } from './recount.service';
import { RecountController } from './recount.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recount } from './entities/recount.entity';
import { RecountItem } from './entities/recount-item.entity';
import { ProductModule } from '../../references/product/product.module';
import { ShopModule } from '../../references/shop/shop.module';
import { DepotModule } from '../../references/depot/depot.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recount, RecountItem]),
    ProductModule,
    ShopModule,
    DepotModule,
  ],
  controllers: [RecountController],
  providers: [RecountService],
})
export class RecountModule {}
