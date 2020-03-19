<template>
  <!-- 文章列表组件 -->
  <!-- 可以帮助我们实现上拉下载  需要变量 -->
  <!-- 放div的目的是为了形成滚动条 -->
  <!-- 后期做阅读记忆用 -->
  <div class="scroll-wrapper">
    <!-- 文章列表 -->
    <!-- van-list组件 如果不加干涉, 初始化完毕 就会检测 自己距离底部的长度 -->
    <!-- 如果超过了限定 ,就会执行 load事件  自动把绑定的 loading 变成true -->
    <!-- 下拉刷新组件 -->
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="successText">
      <van-list finished-text="没有新的了" v-model="upLoading" :finished="finished" @load="onLoad">
        <!-- 循环内容 -->
        <van-cell-group>
          <van-cell v-for="item in articles" :key="item">
            <!-- 放置元素 文章列表的循环项 无图 单图 三图 -->
            <!-- 三图 -->
            <div class="article_item">
              <!-- 标题 -->
              <h3 class="van-ellipsis">三图</h3>
              <!-- 三图图片 -->
              <div class="img_box">
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </div>
              <!-- 单图 -->
               <!-- <div class="img_box">
                <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </div> -->
              <!-- 作者信息 -->
              <div class="info_box">
                <span>你像一阵风</span>
                <span>8评论</span>
                <span>10分钟前</span>
                <span class="close">
                  <van-icon name="cross"></van-icon>
                </span>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      upLoading: false, // 表示是否开启上拉加载 默认值false
      finished: false, // 表示是否已经完成数据的加载
      articles: [], // 文章列表
      downLoading: false, // 表示是否下拉刷新
      successText: '' // 刷新成功的文本
    }
  },
  methods: {
    // 上拉加载
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
    },

    // 下拉刷新
    onRefresh () {
      // 下拉刷新 要获取新的数据 而且是添加在最前面
      setTimeout(() => {
        const arr = Array.from(
          Array(2),
          (value, index) => '新添加' + (index + 1)
        )
        this.articles.unshift(...arr) // 从前添加
        this.downLoading = false // 手动关闭加载状态
        this.successText = `更新了${arr.length}条数据`
      }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
