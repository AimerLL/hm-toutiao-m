<template>
  <div class="more-action">
    <!-- 单元格组件 -->
    <!-- 两个单元格组件用了v-if v-else 前面满足显示前面 不满足显示后面的 -->
    <van-cell-group v-if="!isReport">
      <!-- 注册点击事件,调用不感兴趣的接口 -->
      <!-- 此时用子传父 调用父组件的方法来触发接口 -->
      <van-cell @click="$emit('dislike')">不感兴趣</van-cell>
      <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <!-- 单元格组件 -->
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
      <!-- 注册举报的点击事件 -->
      <van-cell @click="$emit('report', item.value)" v-for="item in reports" :key="item.value">{{ item.label }}</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { reports } from '@/api/constants' // 引入常量变量
import eventBus from '@/utils/eventbus'
export default {
  data () {
    return {
      isReport: false, // 是否举报的意思
      reports // 定义一个reports变量,初始值来源于引入的常量值
    }
  },
  created () {
    // 只要你一开始删除 我就把弹层中反馈组件重置为初始状态
    eventBus.$on('delArticle', () => (this.isReport = false))
  }
}
</script>

<style lang='less' scoped>
.more-action {
  border-radius: 4px;
}
</style>
