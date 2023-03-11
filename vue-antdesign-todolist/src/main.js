/*
=========================================================
Muse - Vue Ant Design Dashboard - v1.0.0
=========================================================

Product Page: https://www.creative-tim.com/product/vue-ant-design-dashboard
Copyright 2021 Creative Tim (https://www.creative-tim.com)
Coded by Creative Tim

=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import Vue from 'vue'
import Antd from 'ant-design-vue';
import VeeValidate from "vee-validate";
import Vuex from 'vuex';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import DefaultLayout from './layouts/Default.vue'
import DashboardLayout from './layouts/Dashboard.vue'
import router from './router'
import {store} from "./store";
import './scss/app.scss';
import setupInterceptors from "./services/setupInterceptors";
import NotificationsPlugin from "./components/NotificationPlugin";
import VueBarcode from 'vue-barcode';
import VueI18n from 'vue-i18n';
import VueCountryDropdown from "vue-country-dropdown";
import { languages, defaultLocale } from "./i18n";
import VueBarcodeScanner from 'vue-barcode-scanner';

Vue.use(Antd);
Vue.use(VeeValidate);
Vue.use(VueI18n);
Vue.use(VueCountryDropdown);
Vue.use(NotificationsPlugin);
Vue.use(Vuex);
Vue.use(VueBarcodeScanner);

// Adding template layouts to the vue components.
Vue.component("layout-default", DefaultLayout);
Vue.component("layout-dashboard", DashboardLayout);
Vue.component("barcode", VueBarcode);

setupInterceptors(store);

Vue.config.productionTip = false;

const localStorageLang = localStorage.getItem("lang");

const i18n = new VueI18n({
  locale: localStorageLang || defaultLocale,
  messages: languages
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')