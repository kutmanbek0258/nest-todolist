import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { ShopModule } from '../../references/shop/shop.module';

@Module({
  imports: [TypeOrmModule.forFeature([Price]), ShopModule],
  controllers: [PriceController],
  providers: [PriceService],
})
export class PriceModule {}
