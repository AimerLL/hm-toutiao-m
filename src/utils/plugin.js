/****
 * 负责提供小函数 以及vue常用的过滤器和函数
 *
 * ************/

export default {
  // 导出一个默认对象
  install (Vue) {
    // 该方法会在Vue.use时调用
    Vue.prototype.$lnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params })
  }
}
