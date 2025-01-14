import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/loginPage.vue'
import overview from '../views/overviewPage.vue'
import dashboard from '../views/dashboardPage.vue'
import { useApiStore } from '../stores/useApiStore'
import axios from 'axios';

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
      meta: { requiresAuth: true },
   },
   {
      path: '/dashboard/:title',
      name: 'dashboardWithTitle',
      component: dashboard,
      props: true,
      meta: { requiresAuth: true },
   },
  ],
})

router.beforeEach((to, from, next) => {
   const apiStore = useApiStore();
   const token = localStorage.getItem('jwtToken');
   if (token) {
     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   }
   if (to.matched.some(record => record.meta.requiresAuth)) {
     if (!apiStore.jwtToken) {
       next({ name: 'login' });
     } else {
       next();
     }
   } else {
     next();
   }
});

export default router
