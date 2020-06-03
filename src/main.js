import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import YmapPlugin from 'vue-yandex-maps'
import { VueMaskDirective } from 'v-mask'
import VuePapaParse from 'vue-papa-parse'

const settings = {
  apiKey: 'b6002087-f5e1-4c54-9e94-aac8b9c4d6d9',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
}
Vue.use(VueRouter)
Vue.use(YmapPlugin, settings)
Vue.use(VuePapaParse)

Vue.directive('mask', VueMaskDirective);

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
