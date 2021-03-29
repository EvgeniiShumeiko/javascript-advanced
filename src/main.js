import Vue from 'vue';
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import InfiniteLoading from "vue-infinite-loading";

import './styles/style.sass';
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.component("infinite-loading", InfiniteLoading);


new Vue({
    el: 'main',
    template: '<App />',
    components: {
        App
    }
})
