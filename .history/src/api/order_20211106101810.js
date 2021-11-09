import { network } from './public.js';

//获取订单的数量
export function getOrderNum() {
  return network({
    url: '/order/getOrderNum'
  })
}

//分页
export function getOrderLimit(params) {
  return network({
    url: '/order/getOrderLimit',
    params: params
  })
}
