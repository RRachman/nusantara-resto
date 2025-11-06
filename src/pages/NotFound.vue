<template>
  <div class="not-found-page">
    <div class="not-found-page__container">
      <div class="not-found-content">
        <div class="error-code">404</div>
        <h1 class="error-title">Page Not Found</h1>
        <p class="error-description">Oops! The page you're looking for doesn't exist or has been moved.</p>
        <div class="action-buttons">
          <Button type="primary" @click="goHome">Go Home</Button>
          <Button type="secondary" @click="goBack">Go Back</Button>
        </div>
      </div>

      <div class="illustration">
        <div class="plate">🍽️</div>
        <div class="floating-elements">
          <span class="floating-item">🥘</span>
          <span class="floating-item">🍜</span>
          <span class="floating-item">🍛</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue';

export default {
  name: 'NotFoundPage',
  components: { Button },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/mixins' as *;

.not-found-page {
  padding: 120px 24px 80px;
  background: $color-white;
  min-height: 100vh;
  @include flex(row, center, center);

  &__container {
    max-width: 1000px;
    margin: 0 auto;
    @include flex(row, space-between, center, 60px);

    @include tablet-down {
      @include flex(column, center, center, 40px);
      text-align: center;
    }
  }
}

.not-found-content {
  flex: 1;
  @include flex(column, flex-start, flex-start, 24px);

  @include tablet-down {
    @include flex(column, center, center, 24px);
  }
}

.error-code {
  @include heading(h1, $font-cormorant);
  color: $brand-500;
  font-size: 120px;
  line-height: 1;
  margin: 0;

  @include mobile {
    font-size: 80px;
  }
}

.error-title {
  @include heading(h2, $font-cormorant);
  color: $gray-900;
  margin: 0;

  @include mobile {
    @include heading(h3, $font-cormorant);
  }
}

.error-description {
  @include text(large, 400, $gray-600);
  margin: 0;
  max-width: 400px;
  line-height: 1.6;
}

.action-buttons {
  @include flex(row, flex-start, center, 16px);
  margin-top: 8px;

  @include tablet-down {
    @include flex(row, center, center, 16px);
  }

  @include mobile {
    @include flex(column, center, stretch, 12px);
    width: 100%;
    max-width: 200px;
  }
}

.illustration {
  flex: 1;
  @include flex(column, center, center);
  position: relative;

  .plate {
    font-size: 120px;
    animation: bounce 2s ease-in-out infinite;

    @include mobile {
      font-size: 80px;
    }
  }
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .floating-item {
    position: absolute;
    font-size: 32px;
    animation: float 3s ease-in-out infinite;

    &:nth-child(1) {
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }

    &:nth-child(2) {
      top: 60%;
      right: 20%;
      animation-delay: 1s;
    }

    &:nth-child(3) {
      bottom: 30%;
      left: 30%;
      animation-delay: 2s;
    }

    @include mobile {
      font-size: 24px;
    }
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-15px) rotate(5deg);
  }
  66% {
    transform: translateY(10px) rotate(-5deg);
  }
}

@include mobile {
  .not-found-page {
    padding: 100px 16px 60px;
  }
}
</style>
