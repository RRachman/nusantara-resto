<template>
  <div class="checkout-page">
    <div class="checkout-page__container">
      <div class="checkout-page__header">
        <h1 class="checkout-page__title">Checkout</h1>
      </div>

      <div class="checkout-content">
        <!-- Order Items -->
        <div class="order-items">
          <div v-for="item in cartStore.cartItems" :key="item.id" class="order-item">
            <img :src="item.image" :alt="item.name" class="order-item__image" />
            <div class="order-item__details">
              <h3>{{ item.name }}</h3>
              <p>{{ item.quantity }} × ${{ item.price }}</p>
            </div>
            <span class="order-item__total">${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>

        <!-- Total -->
        <div class="checkout-total">
          <div class="total-row">
            <span>Total</span>
            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Checkout Form -->
        <form class="checkout-form" @submit.prevent="processCheckout">
          <div class="form-group">
            <input v-model="formData.name" type="text" placeholder="Your Name" required />
          </div>

          <div class="form-group">
            <input v-model="formData.phone" type="tel" placeholder="Phone Number" required />
          </div>

          <div class="form-group">
            <textarea v-model="formData.address" placeholder="Delivery Address" required rows="2"></textarea>
          </div>

          <Button type="primary" class="checkout-button" :disabled="isProcessing">
            <span v-if="isProcessing">Processing...</span>
            <span v-else>Complete Order - ${{ cartStore.totalPrice.toFixed(2) }}</span>
          </Button>
        </form>
      </div>
    </div>

    <!-- Success -->
    <div v-if="showSuccess" class="checkout-success">
      <div class="success-content">
        <div class="success-icon">✅</div>
        <h2>Order Successful!</h2>
        <p>Thank you for your order</p>
        <Button type="primary" @click="goToHome">Back to Home</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore';
import Button from '@/components/atoms/Button.vue';

export default {
  name: 'CheckoutPage',
  components: { Button },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  data() {
    return {
      formData: {
        name: '',
        phone: '',
        address: '',
      },
      isProcessing: false,
      showSuccess: false,
    };
  },
  methods: {
    async processCheckout() {
      this.isProcessing = true;

      // Simulate processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      this.cartStore.clearCart();
      this.isProcessing = false;
      this.showSuccess = true;
    },

    goToHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/mixins' as *;

.checkout-page {
  padding: 100px 24px 60px;
  background: $color-white;
  min-height: 100vh;

  &__container {
    max-width: 600px;
    margin: 0 auto;
  }

  &__header {
    margin-bottom: 40px;
  }

  &__title {
    @include heading(h2, $font-cormorant);
    color: $gray-900;
    margin: 0;
  }
}

.checkout-content {
  @include flex(column, flex-start, stretch, 32px);
}

.order-items {
  @include flex(column, flex-start, stretch, 16px);
}

.order-item {
  @include flex(row, flex-start, center, 16px);
  padding: 16px;
  background: $gray-50;
  border-radius: 12px;
  border: 1px solid $gray-200;

  &__image {
    width: 120px;
    height: 120px;
    align-self: center;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
  }

  &__details {
    flex: 1;

    h3 {
      @include text(medium, 600, $gray-900);
      margin: 0 0 4px 0;
    }

    p {
      @include text(small, 400, $gray-600);
      margin: 0;
    }
  }

  &__total {
    @include text(medium, 700, $gray-900);
  }
}

.checkout-total {
  padding-top: 20px;
  border-top: 1px solid $gray-300;
}

.total-row {
  @include flex(row, space-between, center);
  @include heading(h4, $font-cormorant);
  color: $gray-900;
}

.checkout-form {
  @include flex(column, flex-start, stretch, 20px);
}

.form-group {
  input,
  textarea {
    @include text(medium, 400, $gray-900);
    width: 100%;
    padding: 12px 16px;
    border: 1px solid $gray-300;
    border-radius: 8px;
    background: $color-white;

    &:focus {
      outline: none;
      border-color: $brand-500;
    }

    &::placeholder {
      color: $gray-400;
    }
  }

  textarea {
    resize: vertical;
    min-height: 60px;
  }
}

.checkout-button {
  width: 100%;
  margin-top: 10px;
}

.checkout-success {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  @include flex(row, center, center);
  z-index: 2000;
}

.success-content {
  background: $color-white;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  max-width: 300px;
  width: 90%;

  .success-icon {
    font-size: 48px;
    margin-bottom: 20px;
  }

  h2 {
    @include heading(h4, $font-cormorant);
    color: $gray-900;
    margin: 0 0 12px 0;
  }

  p {
    @include text(medium, 400, $gray-600);
    margin: 0 0 24px 0;
  }
}

@include mobile {
  .checkout-page {
    padding: 80px 16px 40px;
  }

  .order-item {
    @include flex(column, flex-start, stretch, 12px);
    text-align: center;
  }
}
</style>
