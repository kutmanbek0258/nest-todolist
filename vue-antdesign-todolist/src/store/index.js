import Vue from 'vue';
import Vuex from 'vuex';

import {alertModule} from './alert.module';
import {authModule} from './auth.module';
import {productModule} from "./product.module";
import {receiptModule} from "./receipt.module";
import {postingModule} from "./posting.module";
import {reportModule} from "./report.module";
import {noteModule} from "@/store/note.module";
import {equipmentModule} from "@/store/equipment.module";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert: alertModule,
        auth: authModule,
        product: productModule,
        receipt: receiptModule,
        posting: postingModule,
        report: reportModule,
        note: noteModule,
        equipment: equipmentModule,
    }
});
