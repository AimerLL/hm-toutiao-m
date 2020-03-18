/***
 * 处理用户相关的请求
 *
 * ***********/
import request from '@/utils/request'
// request 相当于axios的一个实例 和axios有相同的方法和属性

// 导出一个登录的方法
export function login (data) {
  return request({
    // 配置选项
    url: '/authorizations',
    method: 'post',
    data
  })
  // 返回一个promise对象
}
