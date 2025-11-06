<template>
  <div class="home-page">
    <Jumbotron
      :video-src="homeVideo"
      subtitle="Welcome to Nusantara"
      title="Authentic Menu of Indonesia"
      description="Discover the rich culinary heritage of Indonesia through our carefully curated dishes. Each recipe is passed down through generations, bringing you the true taste of home."
      :buttons="[
        { text: 'Our Menu', type: 'secondary-color', action: () => $router.push('/menu') },
        { text: 'Reserve Now', type: 'primary', action: () => $router.push('/reservation') },
      ]"
    />
    <MenuSection />
  </div>
</template>

<script>
import Jumbotron from '../components/organisms/Jumbotron.vue';
import homeVideo from '@/assets/videos/gallery.mp4';
import MenuSection from '../components/organisms/MenuSection.vue';
import MealCard from '../components/atoms/MealCard.vue';
import MealCardSkeleton from '../components/atoms/MealCardSkeleton.vue';

export default {
  name: 'Home',
  components: { Jumbotron, MenuSection, MealCard, MealCardSkeleton },
  data() {
    return {
      homeVideo: homeVideo,
    };
  },
};
</script>

<style lang="scss" scoped>
.home-page {
  width: 100%;
  min-height: calc(100vh - 80px);
}
</style>
