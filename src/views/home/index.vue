<template>
  <div class="container">
    <!-- 放置tabs组件 -->
    <!-- 默认绑定激活页签 -->
    <van-tabs v-model="activeIndex">
      <!-- 放置子标签 -->
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 生成若干个单元格 -->
        <!-- <div class="scroll-wrapper">
          <van-cell-group>
            <van-cell v-for="item in 20" :key="item" title="标题" value="内容"></van-cell>
          </van-cell-group>
        </div>-->
        <!-- 有多少个tab 就有多少个 article-list  相当于多个article-list实例-->

        <!-- 将频道id传给每个列表组件 用父传子 -->
        <!-- 监听article-list组件中触发的showAction事件 -->
        <ArticleList @showAction="openAction" :channel_id="item.id"></ArticleList>
      </van-tab>
    </van-tabs>
    <!-- 在tabs下放置图标 编辑频道的图标 -->
    <span class="bar_btn">
      <van-icon name="wap-nav"></van-icon>
    </span>
    <!-- 弹层 -->
    <van-popup :style="{ width: '80%' }" v-model="showMoreAction">
      <MoreAction @dislike="dislikeArticle"></MoreAction>
    </van-popup>
  </div>
</template>

<script>
// @ is an alias to /src
import ArticleList from './compoents/article-list'
import MoreAction from './compoents/moreAction'
import { getMyChannels } from '@/api/channels'
import { dislikeArticle } from '@/api/articles' // 不感兴趣
import eventbus from '@/utils/eventbus' // 公共事件处理器 (事件广播)
export default {
  name: 'Home',
  components: {
    ArticleList, MoreAction
  },
  data () {
    return {
      channels: [], // 接收频道数据
      showMoreAction: false, // 是否显示弹层
      articleID: null, // 用来接收点击叉号时所在的文章id
      activeIndex: 0 // 当前默认激活的页签是0
    }
  },
  methods: {
    async getMyChannels () {
      const data = await getMyChannels() // 接收返回的数据
      this.channels = data.channels // 将返回的数据赋值给data中的数据
    },
    // 在article-list组件触发showAction的时候 触发这个事件
    openAction (artID) {
      // 触发事件时 弹出弹层组件
      this.showMoreAction = true
      // 把接收到的文章id存起来 等点击不喜欢或举报的时候在调用接口进行操作
      this.articleID = artID
    },
    // 对文章不感兴趣
    async dislikeArticle () {
      // 调用接口
      try {
        await dislikeArticle({
          target: this.articleID
        })
        this.$lnotify({
          type: 'success',
          message: '操作成功'
        })
        // 触发一个事件 利用事件广播的机制来 通知对应的tab 删除对应的数据
        // 除了 传一个文章之外 你还需要告诉 监听事件的人 现在处于哪个频道 可以传递频道id
        // this.channels[this.activeIndex].id 当前激活的频道数据的id
        eventbus.$emit('delArticle', this.articleID, this.channels[this.activeIndex].id)
        // 所有操作完成后,关闭弹层
        this.showMoreAction = false
      } catch (error) {
        this.$lnotify({
          message: '操作失败'
        })
      }
    }
  },
  created () {
    this.getMyChannels()
  }
}
</script>
<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
