<template>
  <section class="jumbotron">
    <!-- Background Video -->
    <video class="jumbotron__bg" autoplay muted loop playsinline>
      <source :src="videoSrc" type="video/mp4" />
      Browser kamu tidak mendukung video tag.
    </video>

    <!-- Overlay -->
    <div class="jumbotron__overlay"></div>

    <!-- Content -->
    <div class="jumbotron__content">
      <div class="jumbotron__text">
        <div class="jumbotron__subtitle">Welcome to our restaurant</div>
        <div class="jumbotron__title">A Symphony of Flavors in Every Bite</div>
        <div class="jumbotron__desc">
          Savor exquisite culinary creations prepared with fresh, local ingredients. Each dish celebrates vibrant flavors, presented in an ambiance of sophistication. Join us for an unforgettable dining experience where every bite tells a
          story.
        </div>
      </div>

      <!-- Di Jumbotron component -->
      <div class="jumbotron__buttons">
        <Button type="secondary-color">Our Menu</Button>
        <Button type="primary">Reserve a Seat</Button>
      </div>
    </div>
  </section>
</template>

<script>
import Button from '../atoms/Button.vue';
import videoSrc from '@/assets/videos/jumbotron.mp4';

export default {
  name: 'Jumbotron',
  components: { Button },
  data() {
    return { videoSrc };
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/mixins' as *;

.jumbotron {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  @include center-flex;

  &__bg {
    @include cover-background;
    z-index: 0;
  }

  &__overlay {
    @include cover-background;
    @include gradient-overlay;
    z-index: 1;
  }

  &__content {
    position: relative;
    z-index: 2;
    @include container(1024px, 0 2rem);
    @include text-center;
    @include center-flex;
    gap: clamp(1.5rem, 3vw, 2.5rem);
  }

  &__text {
    @include center-flex;
    gap: clamp(0.8rem, 2vw, 1.5rem);
  }

  &__subtitle {
    @include heading(h4, $font-cormorant);
    font-style: italic;
    font-weight: 600;
    color: $brand-200;
  }

  &__title {
    @include heading(h2, $font-cormorant);
    @include text-shadow;
  }

  &__desc {
    @include text(large, 400, $gray-100);
    max-width: 820px;
  }

  &__buttons {
    @include flex(row, center, center, 2px);
    flex-wrap: wrap;
    width: 50%;
    gap: 1.5rem;

    // Button sama panjang
    :deep(button) {
      flex: 1;
      min-width: 150px;
    }

    @include mobile {
      flex-direction: row;
      max-width: 400px;
      gap: 10px;
    }
  }

  @include tablet-down {
    height: 90vh;
    &__content {
      max-width: 90%;
    }
  }

  @include mobile {
    height: auto;
    min-height: 80vh;
    padding: 10rem 1rem;
  }
}
</style>
