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
          <van-cell v-for="item in articles" :key="item.art_id.toString()">
            <!-- 放置元素 文章列表的循环项 无图 单图 三图 -->
            <!-- 三图 -->
            <div class="article_item">
              <!-- 标题 -->
              <h3 class="van-ellipsis">{{ item.title }}</h3>
              <!-- 三图图片 -->
              <div class="img_box" v-if="item.cover.type === 3">
                <van-image class="w33" fit="cover" :src="item.cover.images[0]" />
                <van-image class="w33" fit="cover" :src="item.cover.images[1]" />
                <van-image class="w33" fit="cover" :src="item.cover.images[2]" />
              </div>
              <!-- 单图 -->
               <div class="img_box" v-if="item.cover.type === 1">
                <van-image class="w100" fit="cover" :src="item.cover.images[0]" />
              </div>
              <!-- 作者信息 -->
              <div class="info_box">
                <span>{{ item.aut_name }}</span>
                <span>{{ item.comm_count }}</span>
                <span>{{ item.pubdate }}</span>
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
import { getArticles } from '@/api/articles' // 引入获取文章模块
export default {
  props: {
    // key(props属性名) value{对象 配置}
    channel_id: {
      required: true, // 必填项 此属性的含义 true 要求该 props必须传
      type: Number, // 表示要传入的prop属性的类型
      default: null // 默认值的意思 假如你没有传入 prop属性 默认值 就会被采用
    }
  },
  data () {
    return {
      upLoading: false, // 表示是否开启上拉加载 默认值false
      finished: false, // 表示是否已经完成数据的加载
      articles: [], // 文章列表
      downLoading: false, // 表示是否下拉刷新
      successText: '', // 刷新成功的文本
      timestamp: null // 定义一个时间戳对象 存历史的时间戳
    }
  },
  methods: {
    // 上拉加载
    async onLoad () {
      // 如果新的数据加载完毕 应该吧finished设置为true 表示不再请求加载
      // 可以判断总数 超过XX条就直接关闭
      // if (this.articles.length > 50) {
      //   this.finished = true // 关闭加载
      // } else {
      //   const arr = Array.from(Array(15), (value, index) => index + 1)
      //   // 要注意 上拉加载不是覆盖数据 是追加新数据到队列尾部
      //   this.articles.push(...arr)
      //   // 添加完数据 手动关闭loading
      //   this.upLoading = false
      // }
      // 下面这么写 依然不能关掉加载状态 为什么 ? 因为关掉之后  检测机制  高度还是不够 还是会开启
      // 如果你有数据 你应该 把数据到加到list中
      // 如果想关掉
      // setTimeout(() => {
      //   this.finished = true // 表示 数据已经全部加载完毕 没有数据了
      // }, 1000) // 等待一秒 然后关闭加载状态

      // 人为的控制 请求加载的时间
      await this.$sleep()
      // 如果有历史时间戳 就把历史的传入 如果没有就把现在的传入
      // 获取数据
      const data = await getArticles({ channel_id: this.channel_id, timestamp: this.timestamp || Date.now() })
      // 数据放到队尾
      this.articles.push(...data.results)
      // 关闭加载状态
      this.upLoading = false
      // 将历史时间戳 给timestamp  但是 赋值之前有个判断 需要判断一个历史时间是否为0
      // 如果历史时间戳为 0 说明 此时已经没有数据了 应该宣布 结束   finished true
      if (data.pre_timestamp) {
        // 如果有历史时间戳 说明还可以继续加载
        this.timestamp = data.pre_timestamp
      } else {
        // 如果没有历史时间戳 说明没有数据了 停止获取
        this.finished = true
      }
    },

    // 下拉刷新
    async onRefresh () {
      // 下拉刷新 要获取新的数据 而且是添加在最前面
      // setTimeout(() => {
      //   const arr = Array.from(
      //     Array(2),
      //     (value, index) => '新添加' + (index + 1)
      //   )
      //   this.articles.unshift(...arr) // 从前添加
      //   this.downLoading = false // 手动关闭加载状态
      //   this.successText = `更新了${arr.length}条数据`
      // }, 1000)

      await this.$sleep()
      // 下拉刷新应该发送最新的时间戳
      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: Date.now() // 要实现的是刷新后全部替换为新的数据 这里永远传最新的时间戳
      })
      this.downLoading = false // 关闭下拉刷新的状态
      // 需要判断 最新的时间戳能否获取数据
      // 如果能把新数据整个替换旧数据 如果不能 就告诉大家 暂时没有更新
      if (data.results.length) {
        // 如果有返回数据
        // 需要将整个的articles替换
        this.articles = data.results // 历史数据全部被覆盖
        // 此时你 已经之前的全部数据覆盖了 假如 你之前把数据拉到了低端 也就意味着 你之前的finished已经为true了
        if (data.pre_timestamp) {
          // 因为下拉刷新 换来了一拨新的数据 里面 又有历史时间戳
          this.finished = false // 重新唤醒列表 让列表可以继续上拉加载
          this.timestamp = data.pre_timestamp // 记录历史时间戳给变量
        }
        this.successText = `更新了${data.results.length}条数据`
      } else {
        // 如果换不来新数据
        this.successText = '当前已经是最新了'
      }
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
