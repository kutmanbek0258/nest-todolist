import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { CompanyModule } from '../company/company.module';
import { PersonModule } from '../person/person.module';
import { DepotModule } from '../depot/depot.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shop]),
    CompanyModule,
    PersonModule,
    DepotModule,
  ],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
