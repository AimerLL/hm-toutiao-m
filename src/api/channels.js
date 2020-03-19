/***
 * 处理首页频道数据
 *
 * ************/
import request from '@/utils/request'

// 导出一个获取频道数据的方法
export function getMyChannels () {
  return request({
    // 没有参数 匿名的用户也可以获取数据
    url: '/user/channels'
  })
}
