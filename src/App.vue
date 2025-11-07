<template>
  <div id="app">
    <Loading :isLoading="isLoading" />
    <!-- Navbar tidak ditampilkan di 404 page -->
    <Navbar v-if="!isNotFoundPage" />
    <main>
      <router-view />
      <ConfirmPopup />
    </main>
    <!-- Footer tidak ditampilkan di 404 page -->
    <Footer v-if="!isNotFoundPage" />
  </div>
</template>

<script>
import Navbar from '@/components/organisms/Navbar.vue';
import Footer from '@/components/organisms/Footer.vue';
import Loading from '@/components/atoms/Loading.vue';
import ConfirmPopup from '@/components/atoms/ConfirmPopup.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Loading,
    ConfirmPopup,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    isNotFoundPage() {
      return this.$route.name === 'NotFound';
    },
  },
  created() {
    this.setupRouterGuards();
  },
  methods: {
    setupRouterGuards() {
      this.$router.beforeEach((to, from, next) => {
        this.isLoading = true;
        next();
      });

      this.$router.afterEach(() => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });

      this.$router.onError(() => {
        this.isLoading = false;
        // Redirect ke 404 jika ada error routing
        this.$router.push('/404');
      });
    },
  },
};
</script>
