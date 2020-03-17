import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission' // 权限拦截 导航守卫
import store from './store'
import Vant from 'vant' // 引入vant组件库
import 'vant/lib/index.css'// 引入vant组件的样式
import 'amfe-flexible'// rem适配的
import '@/styles/index.less' // 引入全局的自定义样式  因为要覆盖vant的样式

Vue.config.productionTip = false

// 全局注册  实际上调用了 Vant导出的对象的方法=>install方法
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
