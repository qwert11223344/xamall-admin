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

//删除分类
export function delCategory(params) {
  return network({
    url: '/category/delCategory',
    method: 'post',
    data: params,
  })
}
