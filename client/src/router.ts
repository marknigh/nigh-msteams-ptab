import { createRouter, createWebHistory } from 'vue-router'
import AuthStart from '../src/views/auth-start.vue'
import AuthEnd from '../src/views/auth-end.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth-start',
      component: AuthStart,
    },
    {
      path: '/auth-end',
      component: AuthEnd,
    },
  ],
})