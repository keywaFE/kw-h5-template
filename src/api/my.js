import { post } from '@/utils/request'

// 我的 - 获取微信用户详情 http://doc.keywa.cc/project/224/interface/api/9937
export function userInfo(data) {
  return post('/user/get/wechat/user', data)
}

// 我的 - 更新微信用户数据 http://doc.keywa.cc/project/224/interface/api/9930
export function updateUserInfo(data) {
  return post('/user/update/wechat/user', data)
}
