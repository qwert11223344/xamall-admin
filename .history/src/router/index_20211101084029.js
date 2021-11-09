import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from 'views/Index.vue';

const Login = () => import("views/login/Login.vue");
const Home = () => import('views/Home.vue');
const Allgoods = () => import('views/goods/Allgoods.vue');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: 'allgoods',
      name: 'Allgoods',
      component: Allgoods
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
