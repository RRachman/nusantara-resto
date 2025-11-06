import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';

// Global styles
import '@/assets/styles/main.scss';

const app = createApp(App);
const pinia = createPinia();

// Register Pinia persistence plugin
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.mount('#app');
