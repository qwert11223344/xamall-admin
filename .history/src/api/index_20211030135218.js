import { network } from './public.js';

//登录
export function login(params) {
  return network({
    url: '/admin/login',
    method: 'post',
    data: params
  })
}