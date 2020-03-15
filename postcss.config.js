// 此文件处理postcss插件
module.exports = {
  // 所有的postcss插件
  plugins: {
    // 自动给css样式加前缀属性dispaly: flex
    autoprefixer: {},
    'postcss-pxtorem': {
      // 基准值font-size: 30px => 30/ rootValue = rem
      rootValue: 37.5,
      // 包含哪些文件  给一个* 表示全部都要转化rem
      propList: ['*']
    }
  }
}
