import Vue from 'vue'
import VueRouter from 'vue-router'


const Login = () => import("views/login/Login.vue");
const Home = () => import('views/Home.vue');
const Allgoods = () => import('views/goods/Allgoods.vue');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/goods',
    component: Allgoods,
    children: [{
      path: 'allgoods',
      name: 'Allgoods',
      component: Allgoods
    }]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
