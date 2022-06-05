import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.config.productionTip = false
Vue.prototype.$Message = Message
Vue.use(ElementUI)
Vue.use(VueViewer)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
