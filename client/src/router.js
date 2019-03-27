import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/users/register',
      name: 'Register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/users/login',
      name: 'Login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/question/:id',
      name: 'Questions',
      component: () => import('./views/Question.vue'),
    },
    {
      path: '/questions/ask',
      name: 'Ask',
      component: () => import('./views/FormQuestion.vue'),
    },
    {
      path: '/tags/:name',
      name: 'tag',
    },
  ],
});
