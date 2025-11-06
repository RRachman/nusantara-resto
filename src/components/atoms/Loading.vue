<template>
  <div class="loading-overlay" v-if="isLoading">
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p class="loading-text">Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color-bg, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba($brand-500, 0.3);
  border-top: 3px solid $brand-500;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.loading-text {
  color: $color-white;
  font-size: 1.1rem;
  margin: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
