<template>
  <section class="best-seller-skeleton">
    <div class="best-seller-skeleton__container">
      <div class="best-seller-skeleton__content">
        <!-- Cards Skeleton -->
        <div class="best-seller-skeleton__cards">
          <div v-for="n in 3" :key="n" class="meal-card-skeleton">
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
              <div class="skeleton-line short"></div>
              <div class="skeleton-line medium"></div>
              <div class="skeleton-line long"></div>
            </div>
          </div>
        </div>

        <!-- Text Skeleton -->
        <div class="best-seller-skeleton__text">
          <div class="skeleton-title"></div>
          <div class="skeleton-description"></div>
          <div class="skeleton-description short"></div>
        </div>
      </div>

      <!-- Button Skeleton -->
      <div class="best-seller-skeleton__button">
        <div class="skeleton-button"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BestSellerSkeleton',
};
</script>

<style lang="scss" scoped>
.best-seller-skeleton {
  padding: 80px 24px;
  background: #ffffff;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 48px;
  }

  &__content {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: flex-start;
    gap: 80px;
    width: 100%;
  }

  &__cards {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 32px;
  }

  &__text {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px;
  }

  &__button {
    align-self: center;
  }
}

// Meal Card Skeleton
.meal-card-skeleton {
  display: flex;
  gap: 16px;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background: #f8fafc;

  .skeleton-image {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    background: #e2e8f0;
    animation: pulse 1.5s ease-in-out infinite;
    flex-shrink: 0;
  }

  .skeleton-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .skeleton-line {
      height: 12px;
      border-radius: 6px;
      background: #e2e8f0;
      animation: pulse 1.5s ease-in-out infinite;

      &.short {
        width: 40%;
      }

      &.medium {
        width: 60%;
      }

      &.long {
        width: 80%;
      }
    }
  }
}

// Skeleton elements
.skeleton-title {
  height: 48px;
  background: #e2e8f0;
  border-radius: 8px;
  animation: pulse 1.5s ease-in-out infinite;
  width: 80%;
}

.skeleton-description {
  height: 16px;
  background: #e2e8f0;
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;

  &.short {
    width: 60%;
  }
}

.skeleton-button {
  height: 48px;
  background: #e2e8f0;
  border-radius: 8px;
  animation: pulse 1.5s ease-in-out infinite;
  width: 200px;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .best-seller-skeleton {
    padding: 60px 20px;

    &__container {
      gap: 40px;
    }

    &__content {
      flex-direction: column-reverse;
      align-items: center;
      gap: 40px;
    }

    &__text {
      text-align: center;
      align-items: center;
      gap: 20px;
      width: 100%;
    }

    .skeleton-title {
      height: 36px;
    }
  }
}

@media (max-width: 768px) {
  .best-seller-skeleton {
    padding: 40px 16px;

    &__container {
      gap: 32px;
    }

    &__content {
      gap: 32px;
    }

    &__cards {
      gap: 24px;
    }

    .meal-card-skeleton {
      padding: 12px;

      .skeleton-image {
        width: 60px;
        height: 60px;
      }
    }

    .skeleton-title {
      height: 32px;
    }

    .skeleton-button {
      width: 160px;
      height: 44px;
    }
  }
}

@media (max-width: 480px) {
  .best-seller-skeleton {
    padding: 32px 12px;

    &__container {
      gap: 24px;
    }

    &__content {
      gap: 24px;
    }

    .meal-card-skeleton {
      flex-direction: column;
      text-align: center;

      .skeleton-image {
        width: 100%;
        height: 120px;
        align-self: center;
      }

      .skeleton-content {
        align-items: center;

        .skeleton-line {
          width: 100% !important;
        }
      }
    }

    .skeleton-button {
      width: 140px;
      height: 40px;
    }
  }
}
</style>
