/*global Vue*/
import Router from 'vue-router'
import main from '@/components/main'
import deposit from '@/components/deposit'
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
      path: '/edit',
      name: 'edit',
      component: edit
    }
  ]
})
