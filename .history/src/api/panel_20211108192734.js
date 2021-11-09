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

// 修改版块单条信息
export function updatePanelOne(params) {
  return network({
    url: '/panel/updatePanelOne',
    method: 'post',
    data: params,
  })
}

// 修改版块内容
export function updatePanelContent(params) {
  return network({
    url: '/panel/updatePanelContent',
    method: 'post',
    data: params
  })
}
