import { createRouter, createWebHistory } from 'vue-router';

import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import HomeView from '../views/HomeView.vue';
import Login from '../views/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomeView,
        Header,
        Footer
      }
    },
    {
      path: '/admin/auth',
      name: 'auth',
      component: Login
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const id = sessionStorage.getItem('admin');
  if (!id.isLoggedin && to.name !== 'auth') {
    next({ name: 'auth' });
  }
  if (id.isLoggedin && to.name === 'auth') {
    next({ name: 'home' });
  }
  else next();
})

export default router
