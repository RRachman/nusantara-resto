import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Global styles
import '@/assets/styles/main.scss';

const app = createApp(App);
app.use(router);
app.mount('#app');
