import { post } from '@/utils/request'
// 获取地区数据 http://doc.keywa.cc/project/224/interface/api/9944

export function areaTree() {
  return post('/platform/area/tree')
}
