// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueFilter from 'vue-filter'
import TouchRipple from 'vue-touch-ripple'
import App from './App'
import router from './router'
import Configuration from '@/components/Configuration'
import ConfigurationField from '@/components/Configuration_Field'
import store from '@/store/index'

window.Vue = Vue;

Vue.use(VueFilter)
Vue.use(TouchRipple)
Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.component('configuration', Configuration);
Vue.component('configuration-field', ConfigurationField);

window.numeral = require('numeral')

Vue.mixin({
    methods: 
    {
        numeral: window.numeral
    }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
