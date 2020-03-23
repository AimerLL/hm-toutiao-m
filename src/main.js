import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission' // 权限拦截 导航守卫
import store from './store'
import Vant, { Lazyload } from 'vant' // 引入vant组件库
import plugin from '@/utils/plugin'
import 'vant/lib/index.less'// 引入vant组件的样式  这里要改成less 因为我们想修改某些变量
import '@/styles/index.less' // 引入全局的自定义样式  因为要覆盖vant的样式
import 'amfe-flexible'// rem适配的

Vue.config.productionTip = false

// 全局注册  实际上调用了 Vant导出的对象的方法=>install方法
Vue.use(Vant)
// 必须放到Vant后面 因为plugin里面要用Vant的内置函数
Vue.use(plugin)
// 全局注册v-lazy指令
Vue.use(Lazyload)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
