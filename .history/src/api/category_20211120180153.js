import { network } from './public.js';

// 查询所有的分类
export function getCategory() {
  return network({
    url: '/category'
  })
}

// 分页
export function getCategoryLimit(params) {
  return network({
    url: '/category/getCategoryLimit',
    params: params
  })
}

//添加分类
export function addCategory(params) {
  return network({
    url: '/category/addCategory',
    method: 'post',
    data: params
  })
}

//修改分类
export function updateCategory(params) {
  return network({
    url: '/category/updateCategory',
    method: 'post',
    data: params
  })
}

//删除分类
export function delCategory(params) {
  return network({
    url: '/category/delCategory',
    method: 'post',
    data: params,
  })
}

export function getCategoryGoods(cid) {
  return network({
    url: '/category/getCategoryGoods',
    method: 'post',
    data: {
      cid,
    }
  })
}

// 导航列表
export function getNav() {
  return network({
    url: '/nav',
    method: 'get',

  })
}