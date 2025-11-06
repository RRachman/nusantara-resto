<template>
  <button :class="['btn', type]" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: { type: String, default: 'primary' },
  },
  emits: ['click'],
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/mixins' as *;

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-family: $font-base;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  outline: none;
  text-align: center;

  // Base font size - responsive
  @include text(medium, 600);

  // Mobile styles
  @include mobile {
    padding: 0.625rem 1.25rem;
    border-radius: 25px;
    width: 100%;
  }

  // Tablet styles
  @include tablet {
    padding: 0.7rem 1.4rem;
  }

  // Primary Button
  &.primary {
    background-color: $brand-500;
    color: $color-black;

    &:hover {
      background-color: $brand-600;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  // Secondary Button
  &.secondary {
    background-color: $gray-300;
    color: $color-black;

    &:hover {
      background-color: $gray-400;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  // Secondary Color Button (untuk Jumbotron)
  &.secondary-color {
    background-color: transparent;
    color: $color-white;
    border: 2px solid $brand-500;

    &:hover {
      background-color: $brand-500;
      color: $color-black;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  // Success Button
  &.success {
    background-color: $success-500;
    color: $color-white;

    &:hover {
      background-color: $success-600;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  // Error Button
  &.error {
    background-color: $error-500;
    color: $color-white;

    &:hover {
      background-color: $error-600;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  // Disabled state
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;

    &:hover {
      transform: none;
    }
  }
}
</style>
