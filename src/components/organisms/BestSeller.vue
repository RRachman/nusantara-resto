<template>
  <section class="best-seller">
    <div class="best-seller__container">
      <div class="best-seller__content">
        <!-- Cards Section - Kanan 50% -->
        <div class="best-seller__cards">
          <MealCard v-for="(meal, index) in meals" :key="meal.idMeal" :meal="meal" :price="getRandomPrice()" />
        </div>

        <!-- Text Content - Kiri 50% -->
        <div class="best-seller__text-content">
          <h2 class="best-seller__title">Our Signature Dishes</h2>
          <p class="best-seller__description">Discover a curated selection of our chef's most beloved creations. Each dish is made from premium ingredients and designed to satisfy both your cravings and your wellness goals.</p>
        </div>
      </div>

      <!-- Button di tengah bawah -->
      <div class="best-seller__button-container">
        <Button type="primary" @click="goToMenu" class="best-seller__button"> View Full Menu </Button>
      </div>
    </div>
  </section>
</template>

<script>
import MealCard from '../atoms/MealCard.vue';
import Button from '../atoms/Button.vue';
import { mealService } from '@/services/mealService';

export default {
  name: 'BestSeller',
  components: {
    MealCard,
    Button,
  },
  data() {
    return {
      meals: [],
      loading: true,
    };
  },
  async mounted() {
    await this.loadRandomMeals();
  },
  methods: {
    async loadRandomMeals() {
      try {
        this.loading = true;
        this.meals = await mealService.getRandomMeals(3);
      } catch (error) {
        console.error('Error loading meals:', error);
        this.meals = [];
      } finally {
        this.loading = false;
      }
    },
    getRandomPrice() {
      return (Math.floor(Math.random() * 30) + 8).toFixed(2);
    },
    goToMenu() {
      // Redirect ke halaman menu
      this.$router.push('/menu');

      // Atau jika menggunakan anchor link:
      // window.location.href = '/menu';

      // Atau jika menggunakan event emit:
      // this.$emit('navigate-to-menu');
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
  display: flex;
  justify-content: center;
  background-color: $color-white;

  &__container {
    max-width: 1200px;
    width: 100%;
    @include flex(column, flex-start, center, 48px);
  }

  &__content {
    @include flex(row-reverse, space-between, Center, 80px);
    width: 100%;

    @include tablet-down {
      @include flex(column, center, center, 40px);
    }
  }

  /* KIRI 50% - Text Content */
  &__text-content {
    flex: 0 0 50%;
    max-width: 50%;
    @include flex(column, flex-start, flex-start, 24px);

    @include tablet-down {
      flex: 0 0 100%;
      max-width: 100%;
      text-align: center;
      @include center-flex;
      order: 1; /* Text di atas di mobile */
    }
  }

  &__title {
    @include heading(h2, $font-cormorant);
    color: $gray-900;
    margin: 0;

    @include mobile {
      @include heading(h3, $font-cormorant);
    }
  }

  &__description {
    @include text(large, 400, $gray-600);
    line-height: 1.75;
    margin: 0;

    @include mobile {
      @include text(medium, 400, $gray-600);
    }
  }

  /* Button Container - Tengah Bawah */
  &__button-container {
    @include flex(row, center, center);
    width: 100%;
    margin-top: 10px;
  }

  /* KANAN 50% - Cards Section */
  &__cards {
    flex: 0 0 50%;
    max-width: 50%;
    @include flex(column, flex-start, flex-start, 32px);

    @include tablet-down {
      flex: 0 0 100%;
      max-width: 100%;
      @include flex(column, center, center, 24px);
      order: 2; /* Cards di bawah di mobile */
      padding: 0;
    }

    @include mobile {
      gap: 20px;
    }
  }

  // Responsive
  @include tablet-down {
    padding: 60px 24px;

    &__container {
      gap: 40px;
    }

    &__content {
      gap: 40px;
    }
  }

  @include mobile {
    padding: 40px 16px;

    &__container {
      gap: 32px;
    }

    &__content {
      gap: 32px;
    }
  }
}
</style>
