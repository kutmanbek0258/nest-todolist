import { Module } from '@nestjs/common';
import { PosService } from './pos.service';
import { PosController } from './pos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pos } from './entities/pos.entity';
import { ShopModule } from '../shop/shop.module';
import { ThermalPrinterModule } from '../../thermal-printer/thermal-printer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pos]), ShopModule, ThermalPrinterModule],
  controllers: [PosController],
  providers: [PosService],
  exports: [PosService],
})
export class PosModule {}
