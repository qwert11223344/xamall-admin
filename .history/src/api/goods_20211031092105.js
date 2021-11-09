import { network } from './public.js';

//获取全部商品
export function getAllGoods() {
  return network({
    url: '/goods',
  })
}