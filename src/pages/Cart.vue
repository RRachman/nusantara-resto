<template>
  <div class="cart-page">
    <div class="cart-page__container">
      <!-- Header -->
      <div class="cart-page__header">
        <h1 class="cart-page__title">Your Cart</h1>
        <button v-if="cartStore.totalItems > 0" @click="clearCart" class="btn-clear-cart">Clear Cart</button>
      </div>

      <!-- Empty State -->
      <div v-if="cartStore.totalItems === 0" class="cart-empty">
        <div class="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some delicious meals to get started!</p>
        <Button type="primary" @click="$router.push('/menu')">Browse Menu</Button>
      </div>

      <!-- Cart Content -->
      <div v-else class="cart-content">
        <div class="cart-items-section">
          <!-- Cart Items -->
          <div class="cart-items">
            <div v-for="item in cartStore.cartItems" :key="item.id" class="cart-item">
              <img :src="item.image" :alt="item.name" class="cart-item__image" />

              <div class="cart-item__details">
                <h3 class="cart-item__name">{{ item.name }}</h3>
                <p class="cart-item__price">${{ item.price }}</p>
              </div>

              <div class="cart-item__controls">
                <div class="quantity-controls">
                  <button class="btn-quantity" @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 1">−</button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button class="btn-quantity" @click="increaseQuantity(item)">+</button>
                </div>

                <button class="btn-remove" @click="removeItem(item.id)">🗑️ Remove</button>
              </div>

              <div class="cart-item__total">${{ (item.price * item.quantity).toFixed(2) }}</div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="order-summary">
          <div class="summary-card">
            <h3 class="summary-title">Order Summary</h3>

            <div class="summary-row">
              <span>Items ({{ cartStore.totalItems }})</span>
              <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>

            <div class="summary-row">
              <span>Delivery Fee</span>
              <span>$2.99</span>
            </div>

            <div class="summary-row tax">
              <span>Tax (10%)</span>
              <span>${{ (cartStore.totalPrice * 0.1).toFixed(2) }}</span>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-row total">
              <span>Total</span>
              <span>${{ (cartStore.totalPrice + 2.99 + cartStore.totalPrice * 0.1).toFixed(2) }}</span>
            </div>

            <Button type="primary" @click="$router.push('/checkout')" class="btn-checkout"> Checkout </Button>

            <button @click="$router.push('/menu')" class="btn-continue-shopping">← Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore';
import Button from '@/components/atoms/Button.vue';

export default {
  name: 'CartPage',
  components: { Button },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  methods: {
    increaseQuantity(item) {
      const meal = {
        idMeal: item.id,
        strMeal: item.name,
        strMealThumb: item.image,
        price: item.price,
      };
      this.cartStore.addToCart(meal);
    },

    decreaseQuantity(itemId) {
      this.cartStore.removeFromCart(itemId);
    },

    removeItem(itemId) {
      this.cartStore.removeItemCompletely(itemId);
    },

    clearCart() {
      if (confirm('Are you sure you want to clear your cart?')) {
        this.cartStore.clearCart();
      }
    },

    checkout() {
      // Implement checkout logic here
      alert('Checkout functionality would be implemented here!');
      // this.$router.push('/checkout');
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/mixins' as *;

.cart-page {
  padding: 180px 24px;
  background: $color-white;
  min-height: 100vh;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
  }

  &__header {
    @include flex(row, space-between, center);
    margin-bottom: 40px;
  }

  &__title {
    @include heading(h2, $font-cormorant);
    color: $gray-900;
    margin: 0;
  }
}

// Empty State
.cart-empty {
  text-align: center;
  padding: 80px 20px;
  @include flex(column, center, center, 24px);

  .empty-icon {
    font-size: 80px;
    opacity: 0.7;
  }

  h2 {
    @include heading(h3, $font-cormorant);
    color: $gray-900;
    margin: 0;
  }

  p {
    @include text(large, 400, $gray-600);
    margin: 0;
  }
}

// Cart Content
.cart-content {
  @include flex(row, space-between, flex-start, 40px);

  @include tablet-down {
    @include flex(column, flex-start, stretch, 32px);
  }
}

.cart-items-section {
  flex: 1;
}

.cart-items {
  @include flex(column, flex-start, stretch, 16px);
}

.cart-item {
  @include flex(row, flex-start, center, 20px);
  padding: 24px;
  background: $gray-50;
  border-radius: 16px;
  border: 1px solid $gray-200;

  @include mobile {
    @include flex(column, flex-start, stretch, 16px);
    padding: 20px;
  }
}

.cart-item__image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;

  @include mobile {
    width: 100%;
    height: 120px;
  }
}

.cart-item__details {
  flex: 1;

  @include mobile {
    text-align: center;
  }
}

.cart-item__name {
  @include heading(h6, $font-lora);
  color: $gray-900;
  margin: 0 0 8px 0;
}

.cart-item__price {
  @include text(medium, 600, $brand-600);
  margin: 0;
}

.cart-item__controls {
  @include flex(column, center, center, 12px);

  @include mobile {
    @include flex(row, space-between, center, 16px);
    width: 100%;
  }
}

.quantity-controls {
  @include flex(row, center, center, 8px);
  background: $color-white;
  border-radius: 12px;
  padding: 6px;
  border: 1px solid $gray-300;
}

.btn-quantity {
  @include flex(row, center, center);
  @include text(medium, 600, $gray-700);
  background: $color-white;
  border: none;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: $gray-200;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.quantity {
  @include text(medium, 600, $gray-900);
  min-width: 30px;
  text-align: center;
}

.btn-remove {
  @include text(small, 500, $error-500);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: $error-600;
  }
}

.cart-item__total {
  @include heading(h6, $font-lora);
  color: $gray-900;
  font-weight: 700;
  min-width: 80px;
  text-align: right;

  @include mobile {
    text-align: center;
    margin-top: 8px;
  }
}

// Order Summary
.order-summary {
  width: 350px;
  flex-shrink: 0;

  @include tablet-down {
    width: 100%;
  }
}

.summary-card {
  background: $gray-50;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid $gray-200;
  position: sticky;
  top: 100px;
}

.summary-title {
  @include heading(h4, $font-cormorant);
  color: $gray-900;
  margin: 0 0 20px 0;
  text-align: center;
}

.summary-row {
  @include flex(row, space-between, center);
  margin-bottom: 12px;

  @include text(medium, 400, $gray-700);

  &.tax {
    @include text(small, 400, $gray-600);
  }

  &.total {
    @include text(large, 700, $gray-900);
    margin-top: 8px;
  }
}

.summary-divider {
  height: 1px;
  background: $gray-300;
  margin: 16px 0;
}

.btn-checkout {
  width: 100%;
  margin: 20px 0 12px 0;
}

.btn-continue-shopping {
  @include text(small, 500, $brand-500);
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: 12px;
  transition: color 0.2s ease;

  &:hover {
    color: $brand-600;
  }
}

.btn-clear-cart {
  @include text(small, 500, $error-500);
  background: none;
  border: 1px solid $error-500;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: $error-500;
    color: $color-white;
  }
}

// Mobile Responsive
@include mobile {
  .cart-page {
    padding: 60px 16px;

    &__header {
      @include flex(column, flex-start, stretch, 16px);
      text-align: center;
    }
  }

  .cart-empty {
    padding: 60px 16px;

    .empty-icon {
      font-size: 60px;
    }
  }

  .summary-card {
    padding: 20px;
    position: static;
  }
}
</style>
