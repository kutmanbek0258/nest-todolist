import { Module } from '@nestjs/common';
import { CashRegisterService } from './cash-register.service';
import { CashRegisterController } from './cash-register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashRegister } from './entities/cash-register.entity';
import { ShopModule } from '../shop/shop.module';
import { PosModule } from '../pos/pos.module';

@Module({
  imports: [TypeOrmModule.forFeature([CashRegister]), ShopModule, PosModule],
  controllers: [CashRegisterController],
  providers: [CashRegisterService],
  exports: [CashRegisterService],
})
export class CashRegisterModule {}
