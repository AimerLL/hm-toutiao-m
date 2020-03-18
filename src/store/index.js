/**
 * 专门处理vuex中的模块
 *
 * *****/

import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 专门放置需要共享的状态
    // user 我们token信息的对象  如果做持久化(刷新页面数据还在)
    // 如果缓存有token则需要读取 调用封装的token工具里的获取token
    user: auth.getUser()
  },
  mutations: {
    // 修改state只能通过mutations
    // 修改和删除
    updateUser (state, payload) {
      state.user = payload.user // 定义载荷中的user 数据给state
      // 更新的时候 把最新数据存入本地缓存
      auth.setUser(payload.user)
    },
    // 删除Token
    delUser (state) {
      // 将vuex中的token设置为空对象 为了保证和初始化的时候一致
      state.user = {}
      // 缓存数据也要更新
      auth.delUser() // 删除数据
    }
  },
  actions: {
  },
  modules: {
  }
})
