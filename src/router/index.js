// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Gallery from '@/pages/Gallery.vue'; // Pastikan import ini benar

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
