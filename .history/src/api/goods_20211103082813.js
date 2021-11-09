import { network } from './public.js';

//获取全部商品
export function getAllGoods() {
  return network({
    url: '/goods',
  })
}

//分页
export function getGoodsLimit(params) {
  return network({
    url: '/goods/getGoodsLimit',
    params: params
  })
}

// 查询所有的分类
export function getCategory() {
  return network({
    url: '/category'
  })
}
