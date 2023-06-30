import Vue from 'vue';
import Vuex from 'vuex';

import { alertModule } from './alert.module';
import { authModule } from './auth.module';
import { companyModule } from "./company.module";
import { personModule } from './person.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert: alertModule,
        auth: authModule,
        company: companyModule,
        person: personModule
    }
});
