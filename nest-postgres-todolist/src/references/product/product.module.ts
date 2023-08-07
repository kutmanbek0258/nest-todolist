import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductGroupModule } from '../product-group/product-group.module';
import { PriceTemplateModule } from '../price-template/price-template.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ProductGroupModule,
    PriceTemplateModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
