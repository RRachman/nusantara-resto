<template>
  <section class="best-seller">
    <!-- Skeleton Loading -->
    <BestSellerSkeleton v-if="loading" />

    <!-- Actual Content -->
    <div v-else-if="meals.length > 0" class="best-seller__container">
      <div class="best-seller__content">
        <!-- Cards -->
        <div class="best-seller__cards">
          <MealCard v-for="meal in meals" :key="meal.idMeal" :meal="meal" :price="getRandomPrice()" />
        </div>

        <!-- Text -->
        <div class="best-seller__text">
          <h2 class="best-seller__title">Our Signature Dishes</h2>
          <p class="best-seller__description">Discover a curated selection of our chef's most beloved creations. Each dish is crafted with premium ingredients and culinary expertise.</p>
        </div>
      </div>

      <!-- Button -->
      <Button type="primary" @click="goToMenu" class="best-seller__button">View Full Menu</Button>
    </div>

    <!-- Error State -->
    <div v-else class="best-seller__error">
      <div class="error-content">
        <h3>Unable to load featured dishes</h3>
        <p>Please check your connection and try again</p>
        <Button type="secondary" @click="retryLoading">Retry</Button>
      </div>
    </div>
  </section>
</template>

<script>
import MealCard from '../atoms/MealCard.vue';
import Button from '../atoms/Button.vue';
import BestSellerSkeleton from './BestSellerSkeleton.vue';
import { mealService } from '@/services/mealService';

export default {
  name: 'BestSeller',
  components: {
    MealCard,
    Button,
    BestSellerSkeleton,
  },
  data: () => ({
    meals: [],
    loading: true,
    error: false,
  }),
  async mounted() {
    await this.loadMeals();
  },
  methods: {
    async loadMeals() {
      try {
        this.loading = true;
        this.error = false;
        this.meals = await mealService.getRandomMeals(3);
      } catch (error) {
        console.error('Error loading best seller meals:', error);
        this.error = true;
        this.meals = [];
      } finally {
        this.loading = false;
      }
    },

    async retryLoading() {
      await this.loadMeals();
    },

    getRandomPrice() {
      return (Math.floor(Math.random() * 30) + 8).toFixed(2);
    },

    goToMenu() {
      this.$router.push('/menu');
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/mixins' as *;

.best-seller {
  padding: 80px 24px;
  background: $color-white;
  min-height: 600px;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    @include flex(column, flex-start, center, 48px);
  }

  &__content {
    @include flex(row-reverse, space-between, center, 80px);
    width: 100%;
  }

  &__cards {
    flex: 1;
    @include flex(column, flex-start, flex-start, 32px);
  }

  &__text {
    flex: 1;
    @include flex(column, center, flex-start, 24px);
  }

  &__title {
    @include heading(h2, $font-cormorant);
    color: $gray-900;
    margin: 0;
  }

  &__description {
    @include text(large, 400, $gray-600);
    line-height: 1.75;
    margin: 0;
  }

  &__button {
    align-self: center;
  }

  &__error {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding: 80px 20px;

    .error-content {
      @include flex(column, center, center, 16px);

      h3 {
        @include heading(h4, $font-cormorant);
        color: $gray-900;
        margin: 0;
      }

      p {
        @include text(medium, 400, $gray-600);
        margin: 0;
      }
    }
  }
}

// Tablet & Mobile
@include tablet-down {
  .best-seller {
    padding: 60px 20px;

    &__container {
      gap: 40px;
    }

    &__content {
      @include flex(column-reverse, flex-start, center, 40px);
    }

    &__text {
      text-align: center;
      @include flex(column, center, center, 20px);
    }

    &__title {
      @include heading(h3, $font-cormorant);
    }

    &__description {
      @include text(medium, 400, $gray-600);
    }
  }
}

@include mobile {
  .best-seller {
    padding: 40px 16px;
    min-height: 500px;

    &__container {
      gap: 32px;
      max-width: 70%;
    }

    &__content {
      gap: 32px;
    }

    &__cards {
      gap: 24px;
    }

    &__title {
      @include heading(h4, $font-cormorant);
    }

    &__description {
      @include text(small, 400, $gray-600);
    }

    &__button {
      width: 100%;
      max-width: 200px;
    }
  }
}
</style>
