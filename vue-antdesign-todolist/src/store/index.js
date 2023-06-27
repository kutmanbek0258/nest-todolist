import Vue from 'vue';
import Vuex from 'vuex';

import {alertModule} from './alert.module';
import {authModule} from './auth.module';
import { todoModule } from "@/store/todo.module";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert: alertModule,
        auth: authModule,
        todo: todoModule
    }
});
