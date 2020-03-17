/***
 * 请求管理工具
 *
 * *******/
import JSONBig from 'json-bigint'
import axios from 'axios'
import store from '@/store' // 引入vuex中的store实例对象 相当于组件中的this.$store
import router from '@/router'
// axios.default 是对默认值进行修改
// axios.create()相当于new了一个新的axios实例
const instance = axios.create({
  // 构造参数 传入配置
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0', // 基础地址
  // 此函数是后台响应回来 但是还没进入到 axios的响应拦截器时执行 数组里可以写多个的处理函数
  transformResponse: [function (data) {
    // data就是后端响应回来的字符串
    // JSON.parse()
    // 有就转化 没有就返回一个空对象
    return data ? JSONBig.parse(data) : {}
  }]
})

// token注入应该在请求之前 请求拦截器
instance.interceptors.request.use(function (config) {
  // 成功的时候 读取配置信息 给配置信息注入token
  // 将token注入到headers
  // 判断一下如果有值 才去进行 最后return
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  // 另一种用法
  // config.headers.Authorization && (config.headers.Authorization = `Bearer ${store.state.user.token}`)
  return config
}, function (error) {
  // 直接返回一个promise的错误
  // 错误的话 会直接进入到axios的catch中
  return Promise.reject(error)
})

// 处理返回结果的数据 响应拦截器
instance.interceptors.response.use(function (response) {
  // response实际已经被axios默认包了一层数据  data是我们之前处理过的数据
  // 但是大部分的返回数据中 还有一层data(看接口里 大部分外面还有一层data)
  try {
    // 如果成功则返回 两层可以解开就返回两层
    // 但是还是有一层的
    return response.data.data
  } catch (error) {
    // 如果失败了 就表明response.data不存在 说明只有一层 则返回一层即可
    return response.data
  }
}, function (error) {
  // 直接返回失败
  return Promise.reject(error)
}, async function (error) {
  // 如果请求失败或者失效或者其他错误 会进入 到 响应拦截器的错误的区域
  // 只要是401 就是token失效 (应该用导航守卫将没有token的拦截在外面)
  /*****
     * error
     *    config  是出现这次错误请求的配置信息
     *    request  请求对象
     *    response 响应对象 status (状态码)
     * *****/
  if (error.response && error.response.status === 401) {
    const path = {
      path: '/login', // 地址
      query: {
        // 需要传递的query参数
        redirectUrl: router.currentRoute.fullPath // 表示登录页需要跳转的地址
      }
      // 路由传参的两个写法  动态路由  query()
    }
    //   如果状态码是401的话  就认为token失效了 就需要处理token失效问题
    // refresh_token  相当于一个续命的药
    if (store.state.user.refresh_token) {
      // 表示你有续命的药
      // 如果有refresh_token 我们就要用refresh 换取新token  需要调用刷新token的接口
      // 发请求 得用工具啊 ? 用instance 还是axios呢 ?
      // 这里必须要用axios 因为 现在token已经失效了 instance的拦截器 还是会去将 失效的token注入到 headers中
      // 需要用没有拦截器的axios 来发 刷新token的请求
      try {
        const result = await axios({
          method: 'put', // 请求类型
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations', // 完成的url地址
          headers: { Authorization: `Bearer ${store.state.user.refresh_token}` } // 在请求头中注入refresh_token
        })
        //   await 后面就是 promise成功执行完成的逻辑
        // 新token
        // 如果成功了 应该更新失效的token
        // 直接更新vuex中的数据
        store.commit('updateUser', {
          //   载荷数据
          user: {
            // token
            token: result.data.data.token, // 最新的token
            refresh_token: store.state.user.refresh_token // 还是原来的refresh_token 14天之后过期
          }
        }) // 提交mutations 更新vuex数据
        //   你之所以会到这个位置 是因为  401, 也就意味着你之前的请求 是错误的
        //  需要把之前错误的请求再次发送出去 用axios 还是 instance呢
        return instance(error.config) // 相当于 执行之前出现401错误的请求  返回这个请求的目的 是继续执行这个请求执行链下面的内容
      } catch (error) {
        //   如果失败意味着 你尝试去续命 可是续命失败
        // 重新登录 重新登录之前 需要  删除掉 token 因为此时 token失效 refesh_token也失效
        store.commit('delUser')
        // 重新跳到登录页面
        router.push(path)
      }
    } else {
      //  如果没有refresh_token 直接宣布over 直接跳到登录页面
      // router.push('/login') // 直接跳转到登录无可厚非, 但是我们需要做一种更复杂的场景
      // 如果由于 token失效,跳到登录页, 当前页面怎么办呢 ? 登录成功之后,跳转的还是这个页面吗? 不一定了吧!!
      // 我们要实现 你 在  A页面发请求 结果失效了  也没有refresh_token,只能回到 login, 你登录之后, 你希望回到A页面
      // 怎么做呢 ? 我们需要在跳到登录页中过程中 ,把当前页面的地址 传给 登录页面
      // 登录页面 登录成功能之后 先判断 有没有需要跳转的地址 如果没有跳到主页 如果有 跳到需要跳转的页面
      // router.currentRoute // 表示当前的路由信息对象 里面包含了路由的地址 和参数
      // 我们需要获取 当前路由的带参数的地址  router.currentRoute.fullPath(文档)
      store.commit('delUser') // 也要删除token  因为token失效了
      router.push(path) // 跳回登录页
    }
  }
  // 直接返回失败
  return Promise.reject(error) // 返回执行链的 catch
})

export default instance
