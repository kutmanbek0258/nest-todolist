import { Module } from '@nestjs/common';
import { PriceTemplateService } from './price-template.service';
import { PriceTemplateController } from './price-template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceTemplate } from './entities/price-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PriceTemplate])],
  controllers: [PriceTemplateController],
  providers: [PriceTemplateService],
  exports: [PriceTemplateService],
})
export class PriceTemplateModule {}
