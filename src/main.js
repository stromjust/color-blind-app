import Vue from 'vue'
import App from './App.vue'

export const eventBus = new Vue();

new Vue({
  el: '#colorApp',
  render: h => h(App)
})


// if('serviceWorker' in navigator) {
// 	navigator.serviceWorker
// 		.register('/sw.js')
// 		.then(() => {
// 			console.log("Service Worker Registered");
// 		})
// }
