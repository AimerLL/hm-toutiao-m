<template>
    <!-- 文章列表组件 -->
    <!-- 可以帮助我们实现上拉下载  需要变量 -->
    <!-- 放div的目的是为了形成滚动条 -->
    <!-- 后期做阅读记忆用 -->
    <div class="scroll-wrapper">
        <!-- 文章列表 -->
        <van-list v-model="upLoading" :finished="finished" @load="onLoad"></van-list>
    </div>

</template>

<script>
export default {
  data () {
    return {
      upLoading: false, // 表示是否开启上拉加载 默认值false
      finished: false // 表示是否已经完成数据的加载
    }
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        this.finished = true // 表示 数据已经全部加载完毕 没有数据了
      }, 1000) // 等待一秒 然后关闭加载状态
    }
  }
}
</script>

<style>

</style>
