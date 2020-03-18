<template>
  <div class="container">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 登录布局 -->
    <!-- 外层需要用cell-group组件来包裹提供 边框 -->
    <van-cell-group>
      <!-- 登录手机号 -->
      <!-- .trim去除空格 -->
      <van-field
        :error-message="errorMessage.mobile"
        v-model.trim="loginForm.mobile"
        @blur="checkMobile"
        label="手机号"
        placeholder="请输入手机号"
      ></van-field>
      <!-- 验证码 -->
      <van-field
        :error-message="errorMessage.code"
        v-model.trim="loginForm.code"
        @blur="checkCode"
        label="验证码"
        placeholder="请输入验证码"
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-box">
      <van-button @click="login" type="info" round size="small" block>登录</van-button>
    </div>
  </div>
</template>

<script>
// 引入login方法
// import * as user from '@/api/user'
// user.login
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 表单数据
      loginForm: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      errorMessage: {
        mobile: '', // 手机号错误提示消息
        code: '' // 验证码错误提示消息
      }
    }
  },
  methods: {
    ...mapMutations(['updateUser']), // 可以导入需要的方法
    // 定义检查手机号的方法
    checkMobile () {
      // 获取手机号 判断是否为空以及格式是否正确
      if (!this.loginForm.mobile) {
        // 表示为空
        this.errorMessage.mobile = '手机号不能为空'
        // 此时表示已经错误 不用再校验格式
        // 此次校验没有通过 直接返回一个false
        return false
      }
      // 第二轮校验 手机号格式
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        // 手机号格式不满足
        this.errorMessage.mobile = '手机号格式不正确'
        // 校验没有通过 返回false
        return false
      }
      // 如果到了这个地方 说明校验通过了
      // 通过了之后就没有提示消息 设置为空
      this.errorMessage.mobile = ''
      // 校验通过 返回true
      return true
    },
    // 定义校验验证码的方法
    checkCode () {
      // 和校验手机号一样  判断是否为空以及格式
      if (!this.loginForm.code) {
        // 表示为空 提示消息 返回false
        this.errorMessage.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        // 表示格式不对 提示消息 返回false
        this.errorMessage.code = '验证码格式不正确'
        return false
      }
      // 校验通过 清空提示信息  返回true
      this.errorMessage.code = ''
      return true
    },
    // 登录校验
    async login () {
      // 校验手机号和验证码
      if (this.checkMobile && this.checkCode) {
        // 判断 如果两个都是true 就说明手机号和验证码都校验通过
        // 校验通过之后 要去调用接口 看看用户名和密码正确与否
        // axios 但是后端接口 不论你成功或者失败 它返回的状态码都是200
        try {
          const result = await login(this.loginForm)
          // console.log(result)
          // 拿到token 把token设置给Vuex中的state
          // 要去修改vuex中的state必须通过 mutations
          // result获取的是token和refresh_token
          // 相当于更新token和refresh_token
          this.updateUser({ user: result })
          // 登录成功了 要判断是否有跳转的页面 有的话就去跳转的页面 没有就跳转主页
          const { redirectUrl } = this.$route.query // query查询参数 也就是? 后面的参数
          // redirectUrl有值就说明有跳转的页面 没有值就跳转到主页
          this.$router.push(redirectUrl || '/') // 短路表达式 前面有值则执行前面的 前面没有就执行后面的
        } catch (error) {
          // 需要提示用户 登录失败
          this.$notify({ message: '用户名或者验证码错误', duration: 800 })
        }
      }
    }
  }
}
</script>

<style>
.login-box {
  padding: 20px;
}
</style>
