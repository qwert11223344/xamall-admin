import { network } from './public.js';

//登录
export function login(params) {
  return network({
    url: '/admin/login',
    method: 'post',
    data: params
  })
}

// 验证是否登录
export function checkLogin(params) {
  return network({
    url: '/checkLogin',
    method: 'post',
    data: params
  })
}
