<template>
  <div class="food-card">
    <img class="food-card__image" :src="meal.strMealThumb" :alt="meal.strMeal" />

    <div class="food-card__content">
      <div class="food-card__category">
        <span>{{ meal.strCategory || 'Main Course' }}</span>
      </div>

      <div class="food-card__details">
        <div class="food-card__header">
          <h3 class="food-card__name">{{ meal.strMeal }}</h3>
          <div class="food-card__price">${{ price }}</div>
        </div>

        <p class="food-card__desc">{{ getShortDescription() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MealCard',
  props: {
    meal: {
      type: Object,
      required: true,
    },
    price: {
      type: [String, Number],
      default: '24.99',
    },
  },
  methods: {
    getShortDescription() {
      const ingredients = [];
      for (let i = 1; i <= 3; i++) {
        // Kurangi jadi 3 ingredients
        const ingredient = this.meal[`strIngredient${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push(ingredient);
        }
      }

      if (ingredients.length > 0) {
        return `${ingredients.join(', ')}. ${this.getRandomDescription()}`;
      }

      return this.getRandomDescription();
    },
    getRandomDescription() {
      const descriptions = ['Fresh ingredients with care.', 'Delightful flavors and textures.', 'Premium ingredients for exceptional taste.', 'Perfectly balanced flavors.', 'Made with finest ingredients.'];
      return descriptions[Math.floor(Math.random() * descriptions.length)];
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/mixins' as *;

.food-card {
  @include flex(row, flex-start, flex-start, 16px);
  width: 100%;
  max-width: 600px;
  padding: 0;

  @include mobile {
    @include flex(column, flex-start, flex-start, 12px);
    max-width: 100%;
    padding: 0;
  }

  &__image {
    width: 120px;
    height: 120px;
    background: $gray-200;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;

    @include mobile {
      width: 100%;
      height: 140px; /* Lebih kecil di mobile */
      border-radius: 8px;
    }
  }

  &__content {
    @include flex(column, flex-start, flex-start, 8px);
    flex: 1;
    width: 100%;

    @include mobile {
      width: 100%;
      gap: 8px;
    }
  }

  &__category {
    padding: 6px 12px;
    background: $gray-100;
    border-radius: 16px;
    @include flex(row, center, center);

    @include mobile {
      padding: 4px 10px;
      border-radius: 12px;
      align-self: flex-start;
    }

    span {
      @include text(small, 400, $gray-900);
      text-align: center;

      @include mobile {
        font-size: 12px;
        line-height: 1.2;
      }
    }
  }

  &__details {
    @include flex(column, flex-start, flex-start, 8px);
    width: 100%;

    @include mobile {
      gap: 6px;
    }
  }

  &__header {
    @include flex(row, space-between, flex-start, 12px);
    width: 100%;

    @include mobile {
      @include flex(column, flex-start, flex-start, 4px);
    }
  }

  &__name {
    @include heading(h6, $font-lora);
    color: $gray-900;
    margin: 0;
    font-weight: 500;
    flex: 1;
    line-height: 1.2;

    @include mobile {
      @include text(medium, 500, $gray-900);
      line-height: 1.2;
    }
  }

  &__price {
    @include heading(h6, $font-lora);
    color: $gray-900;
    margin: 0;
    font-weight: 500;
    flex-shrink: 0;
    line-height: 1.2;

    @include mobile {
      @include text(medium, 500, $gray-900);
      line-height: 1.2;
    }
  }

  &__desc {
    @include text(small, 400, $gray-600);
    line-height: 1.4;
    margin: 0;
    width: 100%;
    max-width: 420px;

    @include mobile {
      @include text(small, 400, $gray-600);
      line-height: 1.3;
      max-width: 100%;
      font-size: 13px;
    }
  }
}
</style>
