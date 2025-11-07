// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Gallery from '@/pages/Gallery.vue';
import Cart from '@/pages/Cart.vue';
import Checkout from '@/pages/Checkout.vue';
import NotFound from '@/pages/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  {
    path: '/:pathMatch(.*)*', // Match semua route yang tidak terdaftar
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
