/***
 *  此文件做导航守卫
 *
 * ********/

import router from '@/router'
import store from '@/store'

// 前置守卫
// 每当路由发生变化时,前置守卫就会执行
// (就是你没有登录的时候 限制不能进入的页面)
// 没有登录要拦截的页面有三个 /user个人中心  /user/chat小智同学  /user/profile编辑资料
router.beforeEach(function (to, from, next) {
  // 需要判断你的请求地址 和token
  // 发现需要拦截的三个地址都是/user开头
  // 判断是否是/user开头 并且没有token
  if (to.path.startsWith('/user') && !store.state.user.token) {
    // 都满足的话,表示需要拦截 让用户去登录
    // 不能直接next('/login')
    // 这里要做比如你去A页面 但是A页面需要登录 我们需要在用户登录成功后回到A地址 而不是直接登录后到主页
    next({
      path: '/login', // 首先要跳转的地址-登录页
      query: {
        // fullpath后面会携带?后面的参数 是一个完整路径
        // 这里告诉登录页,登录成功后回到刚才的地址
        redirectUrl: to.fullPath
      }
    })
  } else {
    // 直接放行
    // 有两种情况,一种是地址不是/user开头的地址 一种是是/user开头的地址但是有token(表示已经登录)
    next()
  }
})
