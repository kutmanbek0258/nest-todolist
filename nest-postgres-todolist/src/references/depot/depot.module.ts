import { Module } from '@nestjs/common';
import { DepotService } from './depot.service';
import { DepotController } from './depot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Depot } from './entities/depot.entity';
import { CompanyModule } from '../company/company.module';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [TypeOrmModule.forFeature([Depot]), CompanyModule, PersonModule],
  controllers: [DepotController],
  providers: [DepotService],
  exports: [DepotService],
})
export class DepotModule {}
