/****
 * 负责提供小函数 以及vue常用的过滤器和函数
 *
 * ************/

export default {
  // 导出一个默认对象
  install (Vue) {
    // 该方法会在Vue.use时调用
    Vue.prototype.$lnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params })
    Vue.prototype.$sleep = sleep // 定义一个原型属性sleep 所有的组件都可以用
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
