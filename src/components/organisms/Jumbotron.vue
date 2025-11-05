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

      <!-- Buttons -->
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

.jumbotron {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 21, 40, 0.6);
    z-index: 1;
  }

  &__content {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    text-align: center;
    max-width: 1022px;
    width: 100%;
    padding: 0 2rem;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .jumbotron__subtitle {
      font-family: $font-cormorant;
      font-style: italic;
      font-weight: 600;
      font-size: $h3-desktop;
      line-height: $lh-h3;
      color: #f9e68e;
    }

    .jumbotron__title {
      font-family: $font-cormorant;
      font-weight: 600;
      font-size: $h1-desktop;
      line-height: $lh-h1;
      color: #fdfdfd;
    }

    .jumbotron__desc {
      font-family: $font-base;
      font-weight: 400;
      font-size: $body-medium;
      line-height: $lh-body;
      color: #ededed;
      max-width: 842px;
      margin: 0 auto;
    }
  }

  &__buttons {
    display: flex;
    gap: 8px;
    margin-top: 16px;
  }
}
</style>
