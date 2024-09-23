import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import UpdateUser from '@/views/updateUser.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/update-user', name: 'UpdateUser', component: UpdateUser, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes,
});

// Garde de navigation pour les routes protégées
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('token'); 

  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
