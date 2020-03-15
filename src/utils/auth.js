/*******
 * 专门处理token的处理和删除
 * **********/

// 用来存储用户信息
const USER_TOKEN = 'heima-toutiao-mobile-94'

// 设置用户的token信息
export function setUser (user) {
  // user是对象  应该转成字符串
  window.localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}

// 获取用户的token信息
export function getUser () {
  // 字符串转化为对象在返回
  // || 短路表达式
  // 如果前面为true 后面不执行 前面为false 后面才执行
  return JSON.parse(window.localStorage.getItem(USER_TOKEN) || '{}')
}

// 删除用户的token信息
export function delUser () {
  localStorage.removeItem(USER_TOKEN)
}
