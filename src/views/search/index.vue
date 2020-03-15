<template>
  <div class="container">
    <!-- 导航 -->
    <!-- $router.go(-1) 和 $router.back() 都是返回上一页 -->
    <van-nav-bar left-arrow title='搜索中心' @click-left="$router.back()"></van-nav-bar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
