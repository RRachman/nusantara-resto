<template>
  <button :class="['btn', type]" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'primary' },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: $font-base;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  &.primary {
    background-color: $brand-500;
    color: $color-white;
    &:hover {
      background-color: $brand-600;
    }
  }
  &.secondary {
    background-color: $gray-300;
    color: $gray-900;
    &:hover {
      background-color: $gray-400;
    }
  }
  &.success {
    background-color: $success-500;
    color: $color-white;
    &:hover {
      background-color: $success-600;
    }
  }
  &.error {
    background-color: $error-500;
    color: $color-white;
    &:hover {
      background-color: $error-600;
    }
  }
}
</style>
