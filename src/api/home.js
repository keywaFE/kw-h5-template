import { post } from '@/utils/request'

// 首页 - banner http://doc.keywa.cc/project/224/interface/api/9741
export function banner() {
  return post('/platform/get/ad', { position: 1 })
}

// 首页 - 推荐产品 http://doc.keywa.cc/project/224/interface/api/9790
export function recommend(data) {
  return post('/analyze/index/recommend', data)
}

// 首页 - 热门品类 http://doc.keywa.cc/project/224/interface/api/9804
export function cate() {
  return post('/analyze/hot/cate')
}

// 微信JSDK  http://doc.keywa.cc/project/224/interface/api/9951
export function getWxConfig(data) {
  return post('/wechat/jsdk', data)
}

export default () => {
  return Promise.all([banner(), recommend(), cate()])
}
