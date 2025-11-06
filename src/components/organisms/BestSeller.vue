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
      <Button type="primary" @click="goToMenu" class="best-seller__button"> View Full Menu </Button>
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

        // Gunakan method getRandomMeals yang sudah ditambahkan
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
.best-seller {
  padding: 80px 24px;
  background: #ffffff;
  min-height: 600px;

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

  &__title {
    font-size: 2.5rem;
    font-weight: 600;
    font-family: 'Cormorant', serif;
    color: #1f2937;
    margin: 0;
    line-height: 1.2;
  }

  &__description {
    font-size: 1.125rem;
    font-weight: 400;
    color: #6b7280;
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
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;

      h3 {
        font-size: 1.5rem;
        color: #1f2937;
        margin: 0;
      }

      p {
        color: #6b7280;
        margin: 0;
      }
    }
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .best-seller {
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
    }

    &__title {
      font-size: 2rem;
    }
  }
}

@media (max-width: 768px) {
  .best-seller {
    padding: 40px 16px;
    min-height: 500px;

    &__container {
      gap: 32px;
    }

    &__content {
      gap: 32px;
    }

    &__title {
      font-size: 1.75rem;
    }

    &__description {
      font-size: 1rem;
    }

    &__button {
      width: 40%;
    }
  }
}

@media (max-width: 480px) {
  .best-seller {
    padding: 32px 12px;

    &__container {
      gap: 24px;
    }

    &__content {
      gap: 24px;
    }

    &__title {
      font-size: 1.5rem;
    }

    &__button {
      width: 100%;
      max-width: 200px;
    }
  }
}
</style>
