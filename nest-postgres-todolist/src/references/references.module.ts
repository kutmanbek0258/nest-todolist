import { Module } from '@nestjs/common';
import { PosModule } from './pos/pos.module';
import { CompanyModule } from './company/company.module';
import { DepotModule } from './depot/depot.module';
import { CashRegisterModule } from './cash-register/cash-register.module';
import { PersonModule } from './person/person.module';
import { ShopModule } from './shop/shop.module';
import { SalesmanModule } from './salesman/salesman.module';
import { SupplierModule } from './supplier/supplier.module';
import { ProductGroupModule } from './product-group/product-group.module';
import { PriceTemplateModule } from './price-template/price-template.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    PosModule,
    CompanyModule,
    DepotModule,
    CashRegisterModule,
    PersonModule,
    ShopModule,
    SalesmanModule,
    SupplierModule,
    ProductGroupModule,
    PriceTemplateModule,
    ProductModule,
  ],
})
export class ReferencesModule {}
