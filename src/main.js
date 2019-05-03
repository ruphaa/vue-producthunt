import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase';
import Vuelidate from 'vuelidate';
import VueFire from 'vuefire';
import './firebase';


Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();

Vue.use(Vuelidate)
Vue.use(VueFire)

// // Initialize Firebase
// const config = {
//     apiKey: "AIzaSyDmDGt96uofdJzMacAFDC82ngYhGbsy0gI",
//     authDomain: "vue-producthunt-clone.firebaseapp.com",
//     databaseURL: "https://vue-producthunt-clone.firebaseio.com",
//     projectId: "vue-producthunt-clone",
//     storageBucket: "vue-producthunt-clone.appspot.com",
//     messagingSenderId: "754246709494"
// };
// firebase.initializeApp(config);
// const firestore = firebase.firestore();
// firestore.settings({ timestampsInSnapshots: true})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
