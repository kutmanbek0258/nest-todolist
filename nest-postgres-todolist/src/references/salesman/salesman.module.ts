import { Module } from '@nestjs/common';
import { SalesmanService } from './salesman.service';
import { SalesmanController } from './salesman.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salesman } from './entities/salesman.entity';
import { CompanyModule } from '../company/company.module';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [TypeOrmModule.forFeature([Salesman]), CompanyModule, PersonModule],
  controllers: [SalesmanController],
  providers: [SalesmanService],
  exports: [SalesmanService],
})
export class SalesmanModule {}
