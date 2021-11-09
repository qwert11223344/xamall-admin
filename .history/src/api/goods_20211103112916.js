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

//搜索商品
export function searchGoods(keywords) {
  return network({
    url: '/goods/searchGoods',
    params: {
      keywords,
    }
  })
}

//添加商品
export function addGoods(params) {
  return network({
    url: '/goods/addGoods',
    method: 'post',
    data: params
  })
}

//修改商品
export function updateGoods(params) {
  return network({
    url: '/goods/updateGoods',
    method: 'post',
    data: params
  })
}

//下架商品
export function updateGoodsState(params) {
  return network({
    url: '/goods/updateGoodsState',
    method: 'post',
    data: params
  })
}

//删除商品
export function delGoods(params) {
  return network({
    url: '/goods/delGoods',
    method: 'post',
    data: params
  })
}
