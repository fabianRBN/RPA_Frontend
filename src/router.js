import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About';
import Configuracion from './views/Configuracion';
import Whatsapp from './views/Whatsapp';
import Sorteo from './views/Sorteo';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
      
    },
    {
      path: '/configuracion',
      name: 'configuracion',
      component: Configuracion
    },
    {
      path: '/whatsapp',
      name: 'whatsapp',
      component: Whatsapp
    },
    {
      path: '/sorteo',
      name: 'sorteo',
      component: Sorteo
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      /* component: () => import( './views/About.vue') */
      component: About
    }
  ]
})
