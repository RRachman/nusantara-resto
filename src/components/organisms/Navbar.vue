<template>
  <nav
    class="navbar"
    :class="{
      scrolled: isScrolled,
      'navbar--cart': isCartOrCheckoutPage,
    }"
  >
    <div class="navbar__inner">
      <!-- Logo -->
      <router-link to="/" class="navbar__logo">
        <div class="logo-icon"></div>
        <div class="logo-text">Nusantara</div>
      </router-link>

      <!-- Hamburger Toggle (mobile) -->
      <div class="navbar__toggle" @click="toggleMenu">
        <div :class="['bar', { open: isMenuOpen }]"></div>
        <div :class="['bar', { open: isMenuOpen }]"></div>
        <div :class="['bar', { open: isMenuOpen }]"></div>
      </div>

      <!-- Menu Items -->
      <div class="navbar__menu" :class="{ 'is-open': isMenuOpen }">
        <router-link v-for="(item, index) in menuItems" :key="index" :to="item.route" :class="['navbar__menu-item', { active: $route.path === item.route }]" @click="setActive(item)">
          {{ item.name }}
        </router-link>
      </div>

      <!-- Cart Button (menggantikan Reserve Button) -->
      <router-link to="/cart" class="navbar__cart-button">
        <span class="cart-icon">🛒</span>
        <span class="cart-text">Cart</span>
        <span v-if="cartStore.totalItems > 0" class="cart-badge">
          {{ cartStore.totalItems }}
        </span>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { useCartStore } from '@/stores/cartStore';

export default {
  name: 'Navbar',
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  data() {
    return {
      menuItems: [
        { name: 'Home', route: '/' },
        { name: 'Menu', route: '/gallery' },
        { name: 'Our Story', route: '/our-story' },
        { name: 'Location', route: '/location' },
        { name: 'News', route: '/news' },
      ],
      isMenuOpen: false,
      isScrolled: false,
    };
  },
  computed: {
    isCartOrCheckoutPage() {
      return this.$route.name === 'Cart' || this.$route.name === 'Checkout';
    },
  },
  methods: {
    setActive(item) {
      this.isMenuOpen = false;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 10;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/mixins' as *;

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: transparent;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1000;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);

  // ✅ Navbar hitam di cart & checkout page
  &.navbar--cart {
    background: $gray-900 !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    position: static;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    &::after {
      display: none;
    }

    // Override scrolled state di cart/checkout
    &.scrolled {
      background: $gray-900 !important;
      backdrop-filter: none !important;
    }

    .navbar__menu {
      background: rgba($color-white, 0.05);
      border-color: rgba($color-white, 0.08);
    }

    .navbar__cart-button {
      background: $brand-500;
      color: $gray-900;

      &:hover {
        background: $brand-400;
      }
    }
  }

  &.scrolled {
    background: rgba($color-nav-bg, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba($color-white, 0.2), transparent);
    }
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    transition: all 0.4s ease;
    max-width: 1400px;
    margin: 0 auto;

    @include tablet-down {
      padding: 1.2rem 1.5rem;
    }

    @include mobile {
      padding: 1rem 1.2rem;
    }
  }

  /* === LOGO === */
  &__logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 1001;
    text-decoration: none;

    .logo-icon {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, $brand-400, $brand-600);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba($brand-500, 0.3);
    }

    .logo-text {
      @include heading(h5, $font-cormorant);
      color: $color-white;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
  }

  /* === MENU === */
  &__menu {
    display: flex;
    align-items: center;
    gap: 2rem;
    background: rgba($color-white, 0.08);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba($color-white, 0.1);
    border-radius: 50px;
    padding: 0.5rem 1.5rem;
    transition: all 0.3s ease;

    @include tablet-down {
      gap: 1.5rem;
      padding: 0.5rem 1.2rem;
    }
  }

  &__menu-item {
    @include text(medium, 400, $gray-300);
    cursor: pointer;
    padding: 0.5rem 0;
    position: relative;
    transition: all 0.3s ease;
    white-space: nowrap;
    text-decoration: none;
    display: block;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background: $brand-400;
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }

    &:hover {
      color: $color-white;

      &::after {
        width: 80%;
      }
    }

    &.active {
      color: $color-white;
      font-weight: 600;

      &::after {
        width: 100%;
        background: $brand-500;
      }
    }
  }

  /* === CART BUTTON (menggantikan Reserve Button) === */
  &__cart-button {
    @include flex(row, center, center, 8px);
    @include text(medium, 600, $color-white);
    background: $brand-500;
    padding: 12px 20px;
    border-radius: 30px;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    min-width: 100px;

    &:hover {
      background: $brand-400;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba($brand-500, 0.3);
    }

    .cart-icon {
      font-size: 18px;
    }

    .cart-text {
      @include text(small, 600, $gray-900);
    }

    .cart-badge {
      background: $color-white;
      color: $brand-500;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      @include flex(row, center, center);
      @include text(x-small, 700, $brand-500);
      position: absolute;
      top: -5px;
      right: -5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    @include mobile {
      display: none;
    }
  }

  /* === TOGGLE === */
  &__toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;
    padding: 8px;
    z-index: 1001;

    .bar {
      width: 24px;
      height: 2px;
      background: $color-white;
      border-radius: 2px;
      transition: all 0.3s ease;
      transform-origin: center;

      &.open:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
      }
      &.open:nth-child(2) {
        opacity: 0;
        transform: scale(0);
      }
      &.open:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
      }
    }

    @include mobile {
      display: flex;
    }
  }

  /* === MOBILE MENU === */
  @include mobile {
    &__menu {
      position: fixed;
      top: 100%;
      left: 0;
      width: 100%;
      background: rgba($color-nav-bg, 0.95);
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
      border: 1px solid rgba($color-white, 0.1);
      border-radius: 0;
      padding: 2rem 1.5rem;
      flex-direction: column;
      gap: 1rem;
      transform: translateY(-10px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.4s ease;

      &.is-open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      &-item {
        font-size: 1.1rem;
        padding: 0.75rem 0;
        width: 100%;
        text-align: center;

        &::after {
          display: none;
        }

        &.active {
          background: rgba($brand-500, 0.1);
          border-radius: 8px;
          color: $brand-300;
        }
      }
    }

    // Show cart button in mobile menu
    &__menu.is-open + &__cart-button {
      display: flex;
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 3rem);
      max-width: 280px;
    }
  }

  /* === TABLET RESPONSIVE === */
  @include tablet {
    &__inner {
      gap: 2rem;
    }

    &__menu {
      gap: 1.5rem;
      padding: 0.5rem 1.2rem;
    }
  }
}

/* === SMOOTH SCROLL === */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
</style>
