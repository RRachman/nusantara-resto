<template>
  <Teleport to="body">
    <div v-if="isConfirmOpen" class="confirm-overlay" @click="closeConfirm">
      <div class="confirm-popup" @click.stop>
        <div class="popup-header">
          <h3 class="popup-title">Confirm Purchase</h3>
          <button class="close-btn" @click="closeConfirm">×</button>
        </div>

        <div class="popup-content">
          <div class="meal-info">
            <img :src="confirmData.image" :alt="confirmData.mealName" class="meal-image" />
            <div class="meal-details">
              <h4 class="meal-name">{{ confirmData.mealName }}</h4>
              <p class="meal-quantity">Quantity: {{ confirmData.quantity }}</p>
              <p class="meal-total">Total: ${{ confirmData.totalPrice }}</p>
            </div>
          </div>

          <div class="confirmation-text">
            <p>Are you sure you want to proceed to checkout?</p>
            <p class="note">You can continue shopping to add more items to your cart.</p>
          </div>
        </div>

        <div class="popup-actions">
          <button class="btn-continue-shopping" @click="closeConfirm">Continue Shopping</button>
          <button class="btn-proceed-checkout" @click="confirmAction">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useConfirmStore } from '@/stores/confirmStore';

export default {
  name: 'ConfirmPopup',

  computed: {
    ...mapState(useConfirmStore, ['isConfirmOpen', 'confirmData']),
  },

  methods: {
    ...mapActions(useConfirmStore, ['closeConfirm', 'confirmAction']),
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/mixins' as *;

.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 10000;
  @include center-flex;
  padding: 20px;

  @include mobile {
    padding: 16px;
    align-items: flex-end;
  }
}

.confirm-popup {
  background: $color-white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  max-width: 450px;
  width: 100%;
  animation: slideUp 0.3s ease;
  overflow: hidden;

  @include mobile {
    max-width: 100%;
    border-radius: 16px 16px 0 0;
    animation: slideUpMobile 0.3s ease;
  }

  @include tablet {
    max-width: 400px;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUpMobile {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.popup-header {
  @include flex(row, space-between, center);
  padding: 24px 24px 20px;
  border-bottom: 1px solid $gray-200;

  @include mobile {
    padding: 20px 20px 16px;
  }
}

.popup-title {
  @include heading(h5, $font-lora);
  color: $gray-900;
  margin: 0;

  @include mobile {
    @include heading(h6, $font-lora);
  }
}

.close-btn {
  @include flex(row, center, center);
  background: none;
  border: none;
  font-size: 24px;
  color: $gray-500;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: $gray-100;
    color: $gray-700;
  }

  @include mobile {
    width: 28px;
    height: 28px;
    font-size: 20px;
  }
}

.popup-content {
  padding: 24px 24px 20px;

  @include mobile {
    padding: 20px 20px 16px;
  }
}

.meal-info {
  @include flex(row, flex-start, center, 16px);
  margin-bottom: 24px;
  padding: 16px;
  background: $gray-50;
  border-radius: 12px;

  @include mobile {
    @include flex(column, flex-start, center, 12px);
    text-align: center;
    padding: 12px;
    margin-bottom: 20px;
  }
}

.meal-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;

  @include mobile {
    width: 70px;
    height: 70px;
  }
}

.meal-details {
  flex: 1;

  @include mobile {
    width: 100%;
  }
}

.meal-name {
  @include text(large, 600, $gray-900);
  margin: 0 0 6px 0;
  line-height: 1.3;

  @include mobile {
    @include text(medium, 600, $gray-900);
    margin-bottom: 4px;
  }
}

.meal-quantity,
.meal-total {
  @include text(small, 400, $gray-600);
  margin: 2px 0;
  line-height: 1.4;
}

.confirmation-text {
  text-align: center;
  margin-bottom: 0;

  p {
    @include text(medium, 400, $gray-700);
    margin: 0 0 8px 0;
    line-height: 1.5;

    @include mobile {
      @include text(small, 400, $gray-700);
      margin-bottom: 6px;
    }
  }

  .note {
    @include text(small, 400, $gray-500);
    font-style: italic;
    line-height: 1.4;
    margin: 0;
  }
}

.popup-actions {
  @include flex(row, space-between, stretch, 12px);
  padding: 20px 24px 24px;
  background: $gray-50;
  border-top: 1px solid $gray-200;

  @include mobile {
    @include flex(column, center, stretch, 8px);
    padding: 16px 20px 20px;
  }
}

.btn-continue-shopping,
.btn-proceed-checkout {
  @include text(medium, 600, $color-white);
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-height: 44px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  @include mobile {
    padding: 14px 20px;
    min-height: 48px;
    @include text(medium, 600, $color-white);
    border-radius: 8px;
  }
}

.btn-continue-shopping {
  background: $gray-500;
  color: $color-white;

  &:hover {
    background: $gray-600;
  }
}

.btn-proceed-checkout {
  background: $brand-500;
  color: $gray-900;

  &:hover {
    background: $brand-600;
  }
}

// Very small mobile devices
@media (max-width: 360px) {
  .confirm-overlay {
    padding: 12px;
  }

  .popup-header {
    padding: 16px 16px 12px;
  }

  .popup-content {
    padding: 16px 16px 12px;
  }

  .popup-actions {
    padding: 12px 16px 16px;
  }

  .meal-info {
    padding: 10px;
    margin-bottom: 16px;
  }

  .btn-continue-shopping,
  .btn-proceed-checkout {
    padding: 12px 16px;
    min-height: 44px;
  }
}

// High DPI screens
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .confirm-popup {
    border: 0.5px solid $gray-300;
  }
}

// Ensure proper scrolling on mobile
@include mobile {
  .confirm-popup {
    -webkit-overflow-scrolling: touch;
  }
}
</style>
