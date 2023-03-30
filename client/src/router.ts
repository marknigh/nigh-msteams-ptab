import { createRouter, createWebHistory } from 'vue-router'
import AuthStart from '../src/views/auth-start.vue'
import AuthEnd from '../src/views/auth-end.vue'
import Home from '../src/views/home.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/auth/start',
      component: AuthStart,
    },
    {
      path: '/auth/end(.*)*',
      component: AuthEnd,
    },
  ],
})