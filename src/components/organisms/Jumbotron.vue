<template>
  <section class="jumbotron">
    <video class="jumbotron__bg" autoplay muted loop playsinline>
      <source :src="videoSrc" type="video/mp4" />
      Browser kamu tidak mendukung video tag.
    </video>

    <div class="jumbotron__overlay"></div>

    <div class="jumbotron__content">
      <div class="jumbotron__text">
        <div class="jumbotron__subtitle" v-if="subtitle" :class="{ 'fade-in': showSubtitle }">
          {{ subtitle }}
        </div>

        <div class="jumbotron__title" v-if="title" :class="{ 'fade-in': showTitle }">
          {{ title }}
        </div>

        <div class="jumbotron__desc" v-if="description" :class="{ 'fade-in': showDescription }">
          {{ description }}
        </div>
      </div>

      <div class="jumbotron__buttons" v-if="buttons.length" :class="{ 'fade-in': showButtons }">
        <router-link v-for="(button, index) in buttons" :key="index" :to="getButtonRoute(button.action)" custom v-slot="{ navigate, isActive, isExactActive }">
          <Button :type="button.type" @click="navigate" :class="{ active: isActive }">
            {{ button.text }}
          </Button>
        </router-link>
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
        {
          text: 'Our Menu',
          type: 'secondary-color',
          action: 'menu',
        },
        {
          text: 'Your Order',
          type: 'primary',
          action: 'cart',
        },
      ],
    },
  },
  data() {
    return {
      showSubtitle: false,
      showTitle: false,
      showDescription: false,
      showButtons: false,
    };
  },
  mounted() {
    // Gunakan requestAnimationFrame untuk performance lebih baik
    requestAnimationFrame(() => {
      this.startAnimations();
    });
  },
  methods: {
    startAnimations() {
      setTimeout(() => (this.showSubtitle = true), 300);
      setTimeout(() => (this.showTitle = true), 600);
      setTimeout(() => (this.showDescription = true), 900);
      setTimeout(() => (this.showButtons = true), 1200);
    },

    getButtonRoute(action) {
      const routeMap = {
        menu: '/gallery',
        cart: '/cart',
        home: '/',
        about: '/about',
        contact: '/contact',
      };

      return routeMap[action] || '/';
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

  // Optimasi performance untuk browser
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;

  &__bg {
    @include cover-background;
    z-index: 0;

    // Optimasi video performance
    transform: translateZ(0);
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

    // Optimasi layer
    transform: translateZ(0);
  }

  &__text {
    @include center-flex;
    gap: clamp(0.8rem, 2vw, 1.5rem);
  }

  // Animasi yang dioptimasi
  &__subtitle {
    @include heading(h4, $font-cormorant);
    font-style: italic;
    font-weight: 600;
    color: $brand-200;

    // Initial state - gunakan will-change untuk prepare browser
    will-change: transform, opacity;
    opacity: 0;
    transform: translateY(20px);

    // Gunakan transform dan opacity saja (performance friendly)
    transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    &.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__title {
    @include heading(h2, $font-cormorant);
    @include text-shadow;

    will-change: transform, opacity;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s;

    &.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__desc {
    @include text(large, 400, $gray-100);
    max-width: 820px;

    will-change: transform, opacity;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s;

    &.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__buttons {
    @include flex(row, center, center, 1.5rem);
    flex-wrap: wrap;
    width: 50%;

    will-change: transform, opacity;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s;

    &.fade-in {
      opacity: 1;
      transform: translateY(0);
    }

    // Style untuk router-link
    a {
      text-decoration: none;
      display: contents;

      &:focus-visible {
        outline: 2px solid $brand-300;
        outline-offset: 2px;
        border-radius: 8px;
      }
    }

    :deep(button) {
      flex: 1;
      min-width: 150px;
      cursor: pointer;

      // Hover effects
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      &:active {
        transform: translateY(0);
      }

      // Style untuk button aktif
      &.active {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: $brand-300;
        }
      }
    }

    @include mobile {
      flex-direction: row;
      max-width: 400px;
      gap: 1rem;

      :deep(button) {
        min-width: 140px;
        flex: 0 1 calc(50% - 0.5rem);
      }
    }
  }

  @include tablet-down {
    height: 90vh;

    &__content {
      max-width: 90%;
    }

    &__buttons {
      width: 70%;
    }
  }

  @include mobile {
    height: auto;
    min-height: 100vh;
    padding: 10rem 1rem;

    &__buttons {
      width: 100%;
      max-width: 400px;
    }
  }
}

// Nonaktifkan animasi jika user prefer reduced motion
@media (prefers-reduced-motion: reduce) {
  .jumbotron__subtitle,
  .jumbotron__title,
  .jumbotron__desc,
  .jumbotron__buttons {
    transition: none !important;
    animation: none !important;

    &.fade-in {
      opacity: 1;
      transform: none;
    }
  }

  .jumbotron__buttons :deep(button) {
    transition: none !important;

    &:hover {
      transform: none !important;
    }
  }
}

// High contrast mode support
@media (prefers-contrast: high) {
  .jumbotron__subtitle {
    color: $brand-300;
  }

  .jumbotron__title {
    text-shadow: 2px 2px 0 #000;
  }
}
</style>
