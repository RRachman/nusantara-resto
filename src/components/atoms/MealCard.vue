<template>
  <div class="meal-card">
    <img :src="meal.strMealThumb" :alt="meal.strMeal" class="meal-card__image" />

    <div class="meal-card__content">
      <span class="meal-card__category">{{ meal.strCategory || 'Main Course' }}</span>

      <div class="meal-card__header">
        <h3 class="meal-card__name">{{ meal.strMeal }}</h3>
        <span class="meal-card__price">${{ price }}</span>
      </div>

      <p class="meal-card__description">{{ getDescription() }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MealCard',
  props: {
    meal: { type: Object, required: true },
    price: { type: [String, Number], default: '24.99' },
  },
  methods: {
    getDescription() {
      const ingredients = [];
      for (let i = 1; i <= 3; i++) {
        const ingredient = this.meal[`strIngredient${i}`];
        if (ingredient?.trim()) ingredients.push(ingredient);
      }
      return ingredients.length ? `${ingredients.join(', ')}. Fresh ingredients.` : 'Fresh ingredients with care.';
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/mixins' as *;

.meal-card {
  @include flex(row, flex-start, flex-start, 16px);
  width: 100%;
}

.meal-card__image {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.meal-card__content {
  @include flex(column, flex-start, flex-start, 8px);
  flex: 1;
}

.meal-card__category {
  background: $gray-100;
  color: $gray-900;
  padding: 4px 12px;
  border-radius: 12px;
  @include text(small, 400, $gray-900);
  align-self: flex-start;
}

.meal-card__header {
  @include flex(row, space-between, flex-start, 12px);
  width: 100%;
}

.meal-card__name {
  @include heading(h6, $font-lora);
  color: $gray-900;
  margin: 0;
  flex: 1;
}

.meal-card__price {
  @include heading(h6, $font-lora);
  color: $gray-900;
  margin: 0;
  flex-shrink: 0;
}

.meal-card__description {
  @include text(small, 400, $gray-600);
  line-height: 1.4;
  margin: 0;
}

@include mobile {
  .meal-card {
    @include flex(column, flex-start, flex-start, 12px);
  }

  .meal-card__image {
    width: 100%;
    height: 140px;
  }

  .meal-card__header {
    @include flex(column, flex-start, flex-start, 4px);
  }

  .meal-card__name,
  .meal-card__price {
    @include text(medium, 500, $gray-900);
  }
}
</style>
