// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {store} from './store/store.js'
Vue.config.productionTip = false
Vue.use(resource)
Vue.use(MuseUI)
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store:store,
  router,
  MuseUI,
  template: '<App/>',
  components: { App }
})
