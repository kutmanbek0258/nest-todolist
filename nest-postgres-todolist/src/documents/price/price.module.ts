import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { ShopModule } from '../../references/shop/shop.module';
import { PriceItem } from './entities/price-item.entity';
import { ProductModule } from '../../references/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Price, PriceItem]),
    ShopModule,
    ProductModule,
  ],
  controllers: [PriceController],
  providers: [PriceService],
})
export class PriceModule {}
