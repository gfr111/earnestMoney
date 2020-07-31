import Vue from 'vue'
/*global Vue*/
import Router from 'vue-router'
import main from '@/components/main'
import deposit from '@/components/deposit'
import depositDetail from '@/components/depositDetail'
import edit from '@/components/edit'
Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/deposit/:id',
      name: 'deposit',
      component: deposit
    },
    {
      path: '/depositDetail/:id',
      name: 'depositDetail',
      component: depositDetail
    },
    {
      path: '/edit',
      name: 'edit',
      component: edit
    }
  ]
})
