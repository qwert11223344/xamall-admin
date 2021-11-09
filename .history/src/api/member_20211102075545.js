import { network } from './public.js';

//获取所有会员
export function getAllMember() {
  return network({
    url: '/member/getAllMember'
  })
}

// 添加会员信息
export function addMember(params) {
  return network({
    url: '/member/addMember',
    method: 'post',
    data: params
  })
}
