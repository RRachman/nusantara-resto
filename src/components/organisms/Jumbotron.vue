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
        <div class="jumbotron__subtitle" v-if="subtitle">{{ subtitle }}</div>
        <div class="jumbotron__title" v-if="title">{{ title }}</div>
        <div class="jumbotron__desc" v-if="description">{{ description }}</div>
      </div>

      <!-- Buttons -->
      <div class="jumbotron__buttons" v-if="buttons.length">
        <Button v-for="(button, index) in buttons" :key="index" :type="button.type" @click="button.action">
          {{ button.text }}
        </Button>
      </div>
    </div>
  </section>
</template>

<script>
import Button from '../atoms/Button.vue';
import defaultVideo from '@/assets/videos/jumbotron.mp4';

export default {
  name: 'Jumbotron',
  components: { Button },
  props: {
    videoSrc: {
      type: String,
      default: defaultVideo,
    },
    subtitle: {
      type: String,
      default: 'Welcome to our restaurant',
    },
    title: {
      type: String,
      default: 'A Symphony of Flavors in Every Bite',
    },
    description: {
      type: String,
      default:
        'Savor exquisite culinary creations prepared with fresh, local ingredients. Each dish celebrates vibrant flavors, presented in an ambiance of sophistication. Join us for an unforgettable dining experience where every bite tells a story.',
    },
    buttons: {
      type: Array,
      default: () => [
        { text: 'Our Menu', type: 'secondary-color', action: () => console.log('Menu clicked') },
        { text: 'Reserve a Seat', type: 'primary', action: () => console.log('Reserve clicked') },
      ],
    },
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
