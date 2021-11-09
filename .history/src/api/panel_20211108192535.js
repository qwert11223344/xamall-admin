import { network } from './public.js'

//获取所有版块
export function getAllPanel() {
  return network({
    url: '/panel/allPanel'
  })
}

//添加版块
export function addPanel(params) {
  return network({
    url: '/panel/addPanel',
    method: 'post',
    data: params
  })
}

// 修改版块标题
export function updatePanelTitle(params) {
  return network({
    url: '/panel/updatePanelTitle',
    method: 'post',
    data: params,
  })
}
