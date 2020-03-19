/***
 * 处理文章模块的请求数据
 * 获取文章列表
 * ***********/
import request from '@/utils/request'

export function getArticles (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
