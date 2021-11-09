import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { checkLogin } from './api/index';
Vue.config.productionTip = false

Vue.use(ElementUi)

router.beforeEach(function (to, from, next) {
  let params = {
    token: localStorage.getItem("admin-token")
  }
  checkLogin(params).then(res => {
    if (res.code === 401) { // 没登录
      if (to.path === '') { // 白名单
        next()
      } else {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      }
    } else {
      next()
    }
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
