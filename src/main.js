import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes.js'

export const eventBus = new Vue();

Vue.use(VueRouter);

const router = new VueRouter({
	routes: routes,
	mode: 'history'
})

new Vue({
  el: '#colorApp',
  render: h => h(App),
	router: router
})
