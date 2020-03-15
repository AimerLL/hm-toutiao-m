import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 按需加载的方式配置路由
const Layout = () => import('@/views/layout')// 一级路由
const home = () => import('@/views/home')// 二级路由
const question = () => import('@/views/question')// 二级路由
const video = () => import('@/views/video')// 二级路由
const user = () => import('@/views/user')// 二级路由
// 其他的一级路由
const chat = () => import('@/views/user/chat') // 小智同学
const login = () => import('@/views/login') // 登录页面
const profile = () => import('@/views/user/profile') // 编辑资料
const search = () => import('@/views/search') // 搜索中心
const searchresult = () => import('@/views/search/result') // 搜索中心
const article = () => import('@/views/article') // 文章详情
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout, // 布局组件 一级路由
    children: [{
      path: '', // path什么都不写默认是二级路由的默认组件
      component: home
    }, {
      // 问答组件
      path: '/question',
      component: question
    }, {
      // 视频组件
      path: '/video',
      component: video
    }, {
      // 用户模块
      path: '/user',
      component: user
    }]
  },
  {
    // 一级路由 小智同学
    path: '/user/chat',
    component: chat
  },
  {
    // 一级路由 登录模块
    path: '/login',
    component: login
  },
  {
    // 一级路由 登录模块
    path: '/user/profile',
    component: profile
  },
  {
    // 一级路由 搜索中心
    path: '/search',
    component: search
  },
  {
    // 一级路由 搜索结果
    path: '/search/result',
    component: searchresult
  },
  {
    // 一级路由 文章详情
    path: '/article',
    component: article
  }
]

const router = new VueRouter({
  routes
})

export default router
