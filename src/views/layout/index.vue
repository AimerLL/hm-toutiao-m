<template>
  <div class="container">
    <!-- 导航组件 -->
    <!-- 要判断是不是/user,如果是要隐藏导航 用v-if -->
    <!-- 点击搜索 跳转到搜索界面 -->
    <van-nav-bar @click-right="$router.push('/search')" v-if="showNavBar" fixed title="黑马头条" right-text="搜索"></van-nav-bar>
    <!-- 二级路由容器 -->
    <!-- 如果是/user 就把top改为0 -->
    <div class="my-wrapper" :class="{ noTop: !showNavBar }">
      <router-view></router-view>
    </div>
    <!-- 标签组件 -->
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  computed: {
    // 是否显示navbar
    showNavBar () {
      // this  指向 组件实例
      return this.$route.path !== '/user'
    }
  }
}
</script>

<style lang='less' scoped>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  // 控制二级路由容器
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
