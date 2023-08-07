import { Module } from '@nestjs/common';
import { ProductGroupService } from './product-group.service';
import { ProductGroupController } from './product-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductGroup } from './entities/product-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductGroup])],
  controllers: [ProductGroupController],
  providers: [ProductGroupService],
  exports: [ProductGroupService],
})
export class ProductGroupModule {}
