<template>
  <div id="app">
    <Loading :isLoading="isLoading" />
    <Navbar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/organisms/Navbar.vue';
import Footer from '@/components/organisms/Footer.vue';
import Loading from '@/components/atoms/Loading.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Loading,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    // Setup router navigation guards
    this.setupRouterGuards();
  },
  methods: {
    setupRouterGuards() {
      // Before route change
      this.$router.beforeEach((to, from, next) => {
        this.isLoading = true;
        next();
      });

      // After route change
      this.$router.afterEach(() => {
        // Delay sedikit untuk smooth transition
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });

      // Error handling
      this.$router.onError(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>

<style>
/* Global styles */
</style>
