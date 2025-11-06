<template>
  <section class="home-page">
    <!-- Wrapper Hero -->
    <div class="hero-section">
      <Navbar class="hero-section__navbar" />
      <Jumbotron class="hero-section__jumbotron" />
      <About />
      <BestSeller />
    </div>
  </section>
</template>

<script>
import Navbar from '../components/organisms/Navbar.vue';
import Jumbotron from '../components/organisms/Jumbotron.vue';
import About from '../components/organisms/About.vue';
import BestSeller from '../components/organisms/BestSeller.vue';

export default {
  name: 'Home',
  components: { Navbar, Jumbotron, About, BestSeller },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.home-page {
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  background-color: $color-bg;
}

/* === Hero Section (gabung Navbar + Jumbotron) === */
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;

  &__navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  &__jumbotron {
    position: relative;
    z-index: 1;
  }
}
</style>
