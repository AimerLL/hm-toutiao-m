<template>
    <!-- 文章列表组件 -->
    <!-- 可以帮助我们实现上拉下载  需要变量 -->
    <!-- 放div的目的是为了形成滚动条 -->
    <!-- 后期做阅读记忆用 -->
    <div class="scroll-wrapper">
        <!-- 文章列表 -->
        <!-- van-list组件 如果不加干涉, 初始化完毕 就会检测 自己距离底部的长度 -->
        <!-- 如果超过了限定 ,就会执行 load事件  自动把绑定的 loading 变成true -->
        <van-list finished-text='没有新的了' v-model="upLoading" :finished="finished" @load="onLoad">
          <!-- 循环内容 -->
          <van-cell-group>
            <van-cell v-for="item in articles" :key="item" title="噢噢噢噢" :value="'排队'+ item"></van-cell>
          </van-cell-group>
        </van-list>
    </div>

</template>

<script>
export default {
  data () {
    return {
      upLoading: false, // 表示是否开启上拉加载 默认值false
      finished: false, // 表示是否已经完成数据的加载
      articles: [] // 文章列表
    }
  },
  methods: {
    onLoad () {
      // 如果新的数据加载完毕 应该吧finished设置为true 表示不再请求加载
      // 可以判断总数 超过XX条就直接关闭
      if (this.articles.length > 50) {
        this.finished = true // 关闭加载
      } else {
        const arr = Array.from(Array(15), (value, index) => index + 1)
        // 要注意 上拉加载不是覆盖数据 是追加新数据到队列尾部
        this.articles.push(...arr)
        // 添加完数据 手动关闭loading
        this.upLoading = false
      }

      // 下面这么写 依然不能关掉加载状态 为什么 ? 因为关掉之后  检测机制  高度还是不够 还是会开启
      // 如果你有数据 你应该 把数据到加到list中
      // 如果想关掉
      // setTimeout(() => {
      //   this.finished = true // 表示 数据已经全部加载完毕 没有数据了
      // }, 1000) // 等待一秒 然后关闭加载状态
    }
  }
}
</script>

<style>

</style>
