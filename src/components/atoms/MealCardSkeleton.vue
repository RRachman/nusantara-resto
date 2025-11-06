<template>
  <div class="menu-card-skeleton">
    <div class="skeleton-image"></div>

    <div class="skeleton-content">
      <div class="skeleton-category"></div>

      <div class="skeleton-header">
        <div class="skeleton-name"></div>
        <div class="skeleton-price"></div>
      </div>

      <div class="skeleton-description"></div>
      <div class="skeleton-description short"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuCardSkeleton',
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;

.menu-card-skeleton {
  display: flex;
  gap: 24px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
}

.skeleton-image {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  background: $gray-200; // ⬅️ UBAH KE LIGHT THEME
  animation: pulse 1.5s ease-in-out infinite;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: 140px;
  }
}

.skeleton-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-category {
  width: 80px;
  height: 24px;
  border-radius: 12px;
  background: $gray-200; // ⬅️ UBAH KE LIGHT THEME
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
}

.skeleton-name {
  height: 20px;
  background: $gray-200; // ⬅️ UBAH KE LIGHT THEME
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
  flex: 1;
}

.skeleton-price {
  width: 40px;
  height: 20px;
  background: $gray-200; // ⬅️ UBAH KE LIGHT THEME
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
  flex-shrink: 0;
}

.skeleton-description {
  height: 14px;
  background: $gray-200; // ⬅️ UBAH KE LIGHT THEME
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;

  &.short {
    width: 80%;
  }
}

@keyframes pulse {
  0% {
    opacity: 1; // ⬅️ UBAH OPACITY
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
