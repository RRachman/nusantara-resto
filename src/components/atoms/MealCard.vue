<template>
  <div class="meal-card">
    <div class="meal-card__image-container">
      <img :src="meal.strMealThumb" :alt="meal.strMeal" class="meal-card__image" @error="handleImageError" />
    </div>

    <div class="meal-card__content">
      <span class="meal-card__category">{{ meal.strCategory || 'Main Course' }}</span>

      <div class="meal-card__header">
        <h3 class="meal-card__name">{{ meal.strMeal }}</h3>
        <div class="header-right">
          <span class="meal-card__price">${{ price }}</span>
          <div class="quantity-controls">
            <button class="btn-quantity" @click="decreaseQuantity">−</button>
            <span class="quantity-display">{{ quantity }}</span>
            <button class="btn-quantity" @click="increaseQuantity">+</button>
          </div>
        </div>
      </div>

      <p class="meal-card__description">{{ getDescription() }}</p>

      <div class="action-buttons">
        <button class="btn-custom-secondary" @click="addToCart">Add to Cart</button>
        <Button type="primary" @click="handleBuyNow" class="btn-buy-now">Buy Now</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore';
import { useConfirmStore } from '@/stores/confirmStore';
import Button from './Button.vue';

export default {
  name: 'MealCard',
  components: { Button },
  props: {
    meal: { type: Object, required: true },
    price: { type: [String, Number], default: '24.99' },
  },
  data() {
    return {
      quantity: 1,
      imageError: false,
    };
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

    handleImageError() {
      this.imageError = true;
    },

    increaseQuantity() {
      this.quantity++;
    },

    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    addToCart() {
      const cartStore = useCartStore();
      const mealWithPrice = {
        ...this.meal,
        price: parseFloat(this.price),
      };

      for (let i = 0; i < this.quantity; i++) {
        cartStore.addToCart(mealWithPrice);
      }

      this.quantity = 1;
      this.$emit('addedToCart', this.meal);

      // Redirect ke cart page
      this.$router.push('/cart');
    },
    handleBuyNow() {
      console.log('Buy Now clicked for:', this.meal.strMeal);

      const cartStore = useCartStore();
      const confirmStore = useConfirmStore();

      console.log('Confirm store state before:', {
        isConfirmOpen: confirmStore.isConfirmOpen,
        confirmData: confirmStore.confirmData,
      });

      // Tambahkan item ke cart
      const mealWithPrice = {
        ...this.meal,
        price: parseFloat(this.price),
      };

      for (let i = 0; i < this.quantity; i++) {
        cartStore.addToCart(mealWithPrice);
      }

      // Buka popup konfirmasi
      confirmStore.openConfirm(
        {
          mealName: this.meal.strMeal,
          quantity: this.quantity,
          totalPrice: (parseFloat(this.price) * this.quantity).toFixed(2),
          image: this.meal.strMealThumb,
        },
        () => {
          this.$router.push('/checkout');
        }
      );

      console.log('Confirm store state after:', {
        isConfirmOpen: confirmStore.isConfirmOpen,
        confirmData: confirmStore.confirmData,
      });

      this.quantity = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/mixins' as *;

.meal-card {
  @include flex(row, flex-start, stretch, 16px); // stretch untuk alignment yang konsisten
  width: 100%;
  min-height: 140px; // Minimum height untuk konsistensi
}

.meal-card__image-container {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
}

.meal-card__image {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover; // Pastikan image selalu cover container
  display: block;
}

.meal-card__content {
  @include flex(column, space-between, flex-start, 8px);
  flex: 1;
  min-height: 120px; // Match image height
}

.meal-card__category {
  background: $gray-100;
  color: $gray-900;
  padding: 4px 12px;
  border-radius: 12px;
  @include text(small, 400, $gray-900);
  align-self: flex-start;
  line-height: 1;
}

.meal-card__header {
  @include flex(row, space-between, flex-start, 12px);
  width: 100%;
  flex: 1;
}

.header-right {
  @include flex(column, flex-start, flex-end, 8px);
  flex-shrink: 0;
  text-align: right;
}

.meal-card__name {
  @include heading(h6, $font-lora);
  color: $gray-900;
  margin: 0;
  flex: 1;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2; // Batasi 2 baris
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meal-card__price {
  @include heading(h6, $font-lora);
  color: $gray-900;
  margin: 0;
  white-space: nowrap;
  line-height: 1;
}

.meal-card__description {
  @include text(small, 400, $gray-600);
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2; // Batasi 2 baris
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-shrink: 0;
}

.quantity-controls {
  @include flex(row, center, center, 6px);
  background: $gray-100;
  border: 1px solid $gray-300;
  border-radius: 20px;
  padding: 4px;
  flex-shrink: 0;
}

.btn-quantity {
  @include flex(row, center, center);
  @include text(small, 600, $gray-700);
  background: $color-white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: $gray-200;
  }
}

.quantity-display {
  @include text(small, 600, $gray-900);
  min-width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.action-buttons {
  @include flex(row, space-between, center, 8px);
  width: 100%;
  margin-top: auto; // Push ke bawah
  flex-shrink: 0;
}

.btn-custom-secondary {
  @include flex(row, center, center, 8px);
  @include text(small, 600, $brand-500);
  background: $color-white;
  border: 2px solid $brand-500;
  border-radius: 30px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  flex-shrink: 0;

  &:hover {
    background: $brand-500;
    color: $color-white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
}

.btn-buy-now {
  flex: 1;
  flex-shrink: 0;
}

@include mobile {
  .meal-card {
    @include flex(column, flex-start, stretch, 12px);
    min-height: auto;
  }

  .meal-card__image-container {
    width: 100%;
    height: 160px; // Fixed height untuk mobile
  }

  .meal-card__content {
    min-height: auto;
    gap: 12px;
  }

  .meal-card__header {
    @include flex(column, flex-start, flex-start, 8px);
  }

  .header-right {
    @include flex(row, space-between, center, 12px);
    width: 100%;
    text-align: left;
  }

  .meal-card__name {
    @include text(medium, 600, $gray-900);
    -webkit-line-clamp: 2;
  }

  .meal-card__price {
    @include text(medium, 700, $gray-900);
  }

  .meal-card__description {
    @include text(small, 400, $gray-600);
    -webkit-line-clamp: 2;
  }

  .action-buttons {
    @include flex(column, flex-start, stretch, 8px);
    margin-top: 8px;
  }

  .btn-custom-secondary,
  .btn-buy-now {
    padding: 12px;
  }
}
</style>
