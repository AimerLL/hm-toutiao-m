import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant' // 引入vant组件库
import 'vant/lib/index.css'

Vue.config.productionTip = false

// 全局注册  实际上调用了 Vant导出的对象的方法=>install方法
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
