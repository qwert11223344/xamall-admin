// import axios from 'axios'
// axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
// export default {
//   fetchGet(url, params = {}) {
//     return new Promise((resolve, reject) => {
//       axios.get(url, params).then(res => {
//         resolve(res)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },
//   fetchPost(url, params = {}) {
//     return new Promise((resolve, reject) => {
//       axios.post(url, params).then(res => {
//         resolve(res)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   }
// }
import axios from 'axios';

export function network(config) {
  // 1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:3333',
    timeout: 10000
  })
  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  // instance.defaults.httpAgent = navigator.userAgent;

  // 2. axios的请求拦截器
  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    // if (window.localStorage.getItem('token')) {
    //   config.headers.token = window.localStorage.getItem("token")
    // }
    return config
  }, error => {
    // console.log(error);
  })
  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3. 发送真正的网络请求
  return instance(config)
}

export function request(config) {
  const instance = axios.create({
    timeout: 10000
  })
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3. 发送真正的网络请求
  return instance(config)
}