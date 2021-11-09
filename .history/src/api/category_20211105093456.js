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
    url: '/goods/getCategoryLimit',
    params: params
  })
}
