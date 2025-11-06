<template>
  <div class="home-page">
    <Jumbotron />
    <About />
    <BestSeller />
  </div>
</template>

<script>
import Jumbotron from '../components/organisms/Jumbotron.vue';
import About from '../components/organisms/About.vue';
import BestSeller from '../components/organisms/BestSeller.vue';

export default {
  name: 'Home',
  components: { Jumbotron, About, BestSeller },
};
</script>

<style lang="scss" scoped>
.home-page {
  width: 100%;
  min-height: calc(100vh - 80px); // Kurangi tinggi navbar
}
</style>
