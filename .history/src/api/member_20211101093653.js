import { network } from './public.js';

//获取所有会员
export function getAllMember() {
  return network({
    url: 'member/getAllMember'
  })
}