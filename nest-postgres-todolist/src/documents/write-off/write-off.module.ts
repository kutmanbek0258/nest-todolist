import { Module } from '@nestjs/common';
import { WriteOffService } from './write-off.service';
import { WriteOffController } from './write-off.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WriteOff } from './entities/write-off.entity';
import { ProductModule } from '../../references/product/product.module';
import { UserModule } from '../../user/user.module';
import { ShopModule } from '../../references/shop/shop.module';
import { DepotModule } from '../../references/depot/depot.module';
import { WriteOffItem } from './entities/write-off.item';

@Module({
  imports: [
    TypeOrmModule.forFeature([WriteOff, WriteOffItem]),
    ProductModule,
    UserModule,
    ShopModule,
    DepotModule,
  ],
  controllers: [WriteOffController],
  providers: [WriteOffService],
})
export class WriteOffModule {}
