<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar__inner">
      <!-- Logo -->
      <div class="navbar__logo">
        <div class="logo-icon"></div>
        <div class="logo-text">Nusantara</div>
      </div>

      <!-- Hamburger Toggle (mobile) -->
      <div class="navbar__toggle" @click="toggleMenu">
        <div :class="['bar', { open: isMenuOpen }]"></div>
        <div :class="['bar', { open: isMenuOpen }]"></div>
        <div :class="['bar', { open: isMenuOpen }]"></div>
      </div>

      <!-- Menu Items -->
      <div class="navbar__menu" :class="{ 'is-open': isMenuOpen }">
        <div v-for="(item, index) in menuItems" :key="index" :class="['navbar__menu-item', { active: activeItem === item }]" @click="setActive(item)">
          {{ item }}
        </div>
      </div>

      <!-- Button -->
      <Button type="primary" class="navbar__button"> Reserve a Seat </Button>
    </div>
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
      isMenuOpen: false,
      isScrolled: false,
    };
  },
  methods: {
    setActive(item) {
      this.activeItem = item;
      this.isMenuOpen = false; // auto close saat klik menu
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

<style lang="scss">
.navbar {
  position: fixed;
  inset: 0 auto auto 0;
  width: 100%;
  background-color: transparent;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  z-index: 10;
  overflow-x: hidden;

  &.scrolled {
    background-color: rgba($color-nav-bg, 0.9);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 2rem;
    transition: padding 0.3s ease;
    gap: 3rem;
  }

  /* === LOGO === */
  &__logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .logo-text {
      font-family: $font-base;
      font-weight: 700;
      font-size: clamp(20px, 2vw, 28px);
      color: $color-white;
      transition: font-size 0.3s ease;
    }
  }

  /* === MENU === */
  &__menu {
    display: flex;
    gap: 1.5rem;
    padding: 0.8rem 1.5rem;
    background-color: rgba($color-nav-bg, 0.2);
    border-radius: 72px;
    transition: all 0.3s ease;

    &-item {
      font-family: $font-base;
      font-size: clamp(14px, 1vw, 18px);
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

  /* === TOGGLE === */
  &__toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;

    .bar {
      width: 25px;
      height: 3px;
      background: $color-white;
      border-radius: 2px;
      transition: all 0.3s ease;

      &.open:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }
      &.open:nth-child(2) {
        opacity: 0;
      }
      &.open:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    }
  }

  /* === BUTTON === */
  &__button {
    margin-left: 1rem;
  }

  /* === TABLET (<= 1024px) === */
  @media (max-width: 1024px) {
    &__inner {
      gap: 3rem;
    }

    &__menu {
      margin-left: -40px;
    }
  }

  /* === MOBILE (<= 768px) === */
  @media (max-width: 768px) {
    &__inner {
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 1rem;
    }

    &__toggle {
      display: flex;
    }

    &__menu {
      display: none;
      flex-direction: column;
      align-items: center;
      background-color: rgba($color-nav-bg, 0.95);
      width: 100%;
      border-radius: 12px;
      margin-top: 1rem;
      margin: auto;
      padding: 1rem 0;

      &.is-open {
        display: flex;
        animation: fadeIn 0.3s ease;
      }

      &-item {
        font-size: 1rem;
        padding: 0.5rem 0;
      }
    }

    &__button {
      display: none;
    }
  }
}

/* === ANIMASI === */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
