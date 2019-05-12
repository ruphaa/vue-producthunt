import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuelidate from 'vuelidate';
import VueFire from 'vuefire';
import './firebase';


Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();

Vue.use(Vuelidate)
Vue.use(VueFire)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
