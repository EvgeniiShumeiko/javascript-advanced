import Vue from 'vue';
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import './styles/style.sass';
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
    el: 'main',
    template: '<App />',
    components: {
        App
    }
})
