import Vue from 'vue'
import Vuex from 'vuex'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {}
});

const options = { 'transports': ['websocket', 'polling'], };
const io = socketio('http://localhost:3000', options)

Vue.use(new VueSocketIO({
  debug: true,
  connection: io,
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
}));


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
