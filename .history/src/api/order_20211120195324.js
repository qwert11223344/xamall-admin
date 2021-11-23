import { network } from './public.js';

//获取订单的数量
export function getOrderNum() {
  return network({
    url: '/order/getOrderNum'
  })
}
//获取当前日期的订单
export function getOrderToday(params) {
  return network({
    url: '/order/getOrderToday',
    method: 'post',
    data: params
  })
}
//分页
export function getOrderLimit(params) {
  return network({
    url: '/order/getOrderLimit',
    params: params
  })
}

// 搜索订单号
export function findOrder(order_num) {
  return network({
    url: '/order/findOrder',
    params: {
      order_num,
    }
  })
}
//修改订单
export function updateOrder(params) {
  return network({
    url: '/order/updateOrder',
    method: 'post',
    data: params
  })
}

// 删除订单
export function delOrder(order_num) {
  return network({
    url: '/order/delOrder',
    params: {
      order_num,
    }
  })
}
