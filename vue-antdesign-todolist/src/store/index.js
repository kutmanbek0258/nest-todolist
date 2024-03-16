import Vue from 'vue';
import Vuex from 'vuex';

import { alertModule } from './alert.module';
import { authModule } from './auth.module';
import { companyModule } from "./company.module";
import { personModule } from './person.module';
import { productGroupModule } from './product-group.module';
import { priceTemplateModule } from './price-template.module';
import { productModule } from './product.module';
import { supplierModule } from './supplier.module';
import { salesmanModule } from './salesman.module';
import { depotModule } from './depot.module';
import { shopModule } from './shop.module';
import { posModule } from './pos.module';
import { cashRegisterModule } from './cash-register.module';
import { receiptModule } from "./receipt.modeule";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert: alertModule,
        auth: authModule,
        company: companyModule,
        person: personModule,
        productGroup: productGroupModule,
        priceTemplate: priceTemplateModule,
        product: productModule,
        supplier: supplierModule,
        salesman: salesmanModule,
        depot: depotModule,
        shop: shopModule,
        pos: posModule,
        cashRegister: cashRegisterModule,
        receipt: receiptModule,
    }
});
