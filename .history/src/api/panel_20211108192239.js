import { network } from './public.js'

//获取所有版块
export function getAllPanel() {
  return network({
    url: '/panel/allPanel',
  })
}
