/****
 * 负责提供小函数 以及vue常用的过滤器和函数
 *
 * ************/
import dayjs from 'dayjs' // 引入dayjs的插件
import relativeTime from 'dayjs/plugin/relativeTime' // 引入上面里相对时间的插件
import 'dayjs/locale/zh-cn' // 不会引入语言包 默认是英文 手动引入中文
dayjs.extend(relativeTime) // 相当于dayjs插件的扩展 相对时间的方法 这个方法写完dayjs就有form方法

export default {
  // 导出一个默认对象
  install (Vue) {
    // 该方法会在Vue.use时调用
    Vue.prototype.$lnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params })
    Vue.prototype.$sleep = sleep // 定义一个原型属性sleep 所有的组件都可以用
    // 注册一个全局过滤器
    Vue.filter('relTime', relTime)
  }
}

// 休眠函数
function sleep (time = 500) {
  // 返回一个promise
  return new Promise(function (resolve, reject) {
    // 给一个延迟
    setTimeout(() => resolve(), time)
  })
}

// 时间转化为相对时间的函数
function relTime (date) {
  // dayjs().from(date) 当前时间距离传入的时间有多远
  // .locale() 进行本地语言包转化
  return dayjs().locale('zh-cn').from(date)
}
