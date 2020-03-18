/***
 * 需要导出一个对象
 *
 * *******/
module.exports = {
  // 需要更改less中变量的配置
  css: {
    loaderOptions: {
      // 所有的关于样式loader相关的选项
      less: {
        // modifyVars是less-loader的一个选项 通过这个选项可以改变默认值
        modifyVars: {
          blue: '#3296fa'
        }
      }
    }
  }
}
