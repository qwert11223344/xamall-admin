import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from 'views/Index.vue';

const Login = () => import("views/login/Login.vue");
const Home = () => import('views/Home.vue');
const Allgoods = () => import('views/goods/Allgoods.vue');
const EditGoods = () => import('views/goods/EditGoods.vue');
const CategoryGoods = () => import('views/goods/CategoryGoods.vue')
const Member = () => import('views/member/Member.vue');
const Order = () => import('views/order/Order.vue')
const Panel = () => import('views/panel/Panel.vue')
const Main = () => import('views/Main.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home,
        children: [
          {
            path: '/main',
            name: 'Main',
            component: Main
          },
          {
            path: 'allgoods',
            name: 'Allgoods',
            component: Allgoods
          },
          {
            path: 'editgoods',
            name: 'EditGoods',
            component: EditGoods,
          },
          {
            path: 'categorygoods',
            component: CategoryGoods
          },
          {
            path: 'member',
            component: Member,
          },
          {
            path: 'order',
            component: Order
          },
          {
            path: 'panel',
            component: Panel
          }]
      },
    ],
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
