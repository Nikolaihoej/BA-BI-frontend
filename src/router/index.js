import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/loginPage.vue'
import overview from '../views/overviewPage.vue'
import dashboard from '../views/dashboardPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
       path: '/login',
       name: 'login',
       component: login,
    },
    {
      path: '/oversigt',
      name: 'oversigt',
      component: overview,
   },
   {
      path: '/dashboard/:title',
      name: 'dashboardWithTitle',
      component: dashboard,
      props: true,
   },
  ],
})

export default router
