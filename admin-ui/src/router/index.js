import { createRouter, createWebHistory } from 'vue-router';

import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import HomeView from '../views/HomeView.vue';
import Login from '../views/Login.vue';
import Movies from '../views/Movies.vue';
import Series from '../views/Series.vue';

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
    {
      path: '/admin/movies',
      name: 'movies',
      components: {
        default: Movies,
        Header,
        Footer
      }
    },
    {
      path: '/admin/series',
      name: 'series',
      components: {
        default: Series,
        Header,
        Footer
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const id = JSON.parse(sessionStorage.getItem('ad')) || null;
  if (id === null && to.name !== 'auth') {
    next({ name: 'auth' });
  }
  else if (id !== null && id.isLoggedin === true && to.name === 'auth') {
    next({ name: 'home' });
  }
  else {
    next();
  }
})

export default router
