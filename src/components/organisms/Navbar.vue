<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="navbar__logo">
      <div class="logo-icon"></div>
      <div class="logo-text">Nusantara resto</div>
    </div>

    <!-- Menu -->
    <div class="navbar__menu">
      <div v-for="(item, index) in menuItems" :key="index" :class="['navbar__menu-item', { active: activeItem === item }]" @click="setActive(item)">
        {{ item }}
      </div>
    </div>

    <!-- Button Reserve (atom) -->
    <Button type="primary"> Reserve a Seat </Button>
  </nav>
</template>

<script>
import Button from '../atoms/Button.vue';

export default {
  name: 'Navbar',
  components: { Button },
  data() {
    return {
      menuItems: ['Home', 'Menu', 'Our Story', 'Location', 'News'],
      activeItem: 'Home',
    };
  },
  methods: {
    setActive(item) {
      this.activeItem = item;
    },
  },
};
</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 5rem;
  background-color: transparent;
  position: fixed;

  z-index: 10;

  /* Logo */
  &__logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .logo-text {
      font-family: $font-base;
      font-weight: 700;
      font-size: $h2-desktop;
      line-height: $lh-h2;
      color: $color-white;
      text-transform: none; // Huruf sesuai input, tidak diubah
    }
  }

  /* Menu */
  &__menu {
    display: flex;
    gap: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: rgba($color-nav-bg, 0.2);
    border-radius: 72px;

    &-item {
      font-family: $font-base;
      font-size: $body-medium;
      line-height: $lh-body;
      font-weight: 400;
      color: $gray-400;
      cursor: pointer;
      transition: color 0.3s;

      &.active {
        font-weight: 600;
        color: $color-white;
      }

      &:hover {
        color: $color-white;
      }
    }
  }

  /* Button atom tetap dipakai, Navbar cuma positioning */
  /* Tombol otomatis height & radius dari Button.vue */

  /* Responsive */
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 1rem 2rem;

    &__menu {
      margin: 1rem 0;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
}
</style>
