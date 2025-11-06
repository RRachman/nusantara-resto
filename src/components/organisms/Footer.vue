<template>
  <footer class="footer">
    <div class="footer__container">
      <!-- Main Content -->
      <div class="footer__main">
        <!-- Left Section - CTA -->
        <div class="footer__cta">
          <h2 class="footer__title">Explore Our Locals-Inspired Dishes</h2>
          <p class="footer__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, error!</p>
        </div>

        <!-- Middle Section - Links -->
        <div class="footer__links">
          <div class="footer__link-item footer__link-item--heading">Home</div>
          <div class="footer__link-item">Menu</div>
          <div class="footer__link-item">Our Story</div>
          <div class="footer__link-item">Reservation</div>
          <div class="footer__link-item">News</div>
        </div>

        <!-- Right Section - Social -->
        <div class="footer__social">
          <div class="footer__social-title">Connect On</div>
          <div class="footer__social-icons">
            <div class="footer__social-icon facebook">
              <div class="icon-bg"></div>
              <div class="icon-f"></div>
            </div>
            <div class="footer__social-icon instagram">
              <div class="icon-gradient-1"></div>
              <div class="icon-gradient-2"></div>
              <div class="icon-gradient-3"></div>
              <div class="icon-dot"></div>
            </div>
            <div class="footer__social-icon twitter">
              <div class="icon-bird"></div>
            </div>
            <div class="footer__social-icon whatsapp">
              <div class="icon-bg-gray"></div>
              <div class="icon-bg-green"></div>
              <div class="icon-bg-white"></div>
              <div class="icon-dot-white"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="footer__bottom">
        <div class="footer__copyright">©Nusantara 2025. All rights reserved.</div>
        <div class="footer__legal">
          <div class="footer__legal-item">Privacy Policy</div>
          <div class="footer__legal-separator"></div>
          <div class="footer__legal-item">Terms of Services</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Button from '../atoms/Button.vue';

export default {
  name: 'Footer',
  components: { Button },
  methods: {
    goToMenu() {
      this.$router.push('/menu');
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/mixins' as *;

.footer {
  background-color: $color-black;
  padding: 80px 0 40px;
  color: $color-white;

  &__container {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 20px;

    @include tablet-down {
      padding: 0 16px;
    }
  }

  &__main {
    @include flex(row, space-between, flex-start);
    margin-bottom: 60px;

    @include tablet-down {
      @include flex(column, flex-start, flex-start, 40px);
    }
  }

  /* === CTA SECTION === */
  &__cta {
    width: 510px;
    @include flex(column, flex-start, flex-start, 3px);

    @include tablet-down {
      width: 100%;
      max-width: 510px;
    }

    @include mobile {
      gap: 24px;
    }
  }

  &__title {
    @include heading(h2, $font-cormorant);
    color: $color-white;
    font-weight: 600;
    margin: 0;
    line-height: 1.15;

    @include mobile {
      @include heading(h3, $font-cormorant);
    }
  }

  &__button {
    @include flex(row, center, center, 8px);
    padding: 12px 24px;

    &-icon {
      width: 24px;
      height: 24px;
      position: relative;

      .arrow-line {
        width: 9.9px;
        height: 9.9px;
        position: absolute;
        left: 7.05px;
        top: 7.05px;
        outline: 1.5px solid $gray-900;
        outline-offset: -0.75px;
      }

      .arrow-head {
        width: 7px;
        height: 7px;
        position: absolute;
        left: 10px;
        top: 7px;
        outline: 1.5px solid $gray-900;
        outline-offset: -0.75px;
      }
    }
  }

  /* === LINKS SECTION === */
  &__links {
    @include flex(column, flex-start, flex-start, 24px);

    @include tablet-down {
      @include flex(row, flex-start, center, 32px);
      flex-wrap: wrap;
    }

    @include mobile {
      gap: 24px;
    }
  }

  &__link-item {
    @include text(large, 400, $gray-400);
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: $color-white;
    }

    &--heading {
      @include text(large, 500, $gray-300);
    }
  }

  /* === SOCIAL SECTION === */
  &__social {
    @include flex(column, flex-start, flex-start, 24px);

    @include tablet-down {
      align-items: center;
    }
  }

  &__social-title {
    @include text(large, 600, $gray-500);
    text-align: center;
  }

  &__social-icons {
    @include flex(row, flex-start, center, 16px);
  }

  &__social-icon {
    width: 32px;
    height: 32px;
    position: relative;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }

    /* Facebook */
    &.facebook {
      .icon-bg {
        width: 28px;
        height: 28px;
        position: absolute;
        left: 2px;
        top: 2px;
        background: linear-gradient(180deg, #18acfe 0%, #0163e0 100%);
        border-radius: 50%;
      }

      .icon-f {
        width: 12px;
        height: 22px;
        position: absolute;
        left: 10px;
        top: 8px;
        background: $color-white;
      }
    }

    /* Instagram */
    &.instagram {
      .icon-gradient-1 {
        width: 28px;
        height: 28px;
        position: absolute;
        left: 2px;
        top: 2px;
        background: radial-gradient(ellipse 91.14% 91.14% at 35.71% 75%, #b13589 0%, #c62f94 79%, #8a3ac8 100%);
        border-radius: 6px;
      }

      .icon-gradient-2 {
        width: 28px;
        height: 28px;
        position: absolute;
        left: 2px;
        top: 2px;
        background: radial-gradient(ellipse 80.69% 80.69% at 32.14% 103.57%, #e0e8b7 0%, #fb8a2e 44%, #e2425c 71%, transparent 100%);
        border-radius: 6px;
      }

      .icon-gradient-3 {
        width: 28px;
        height: 28px;
        position: absolute;
        left: 2px;
        top: 2px;
        background: radial-gradient(ellipse 138.9% 29.71% at -5.36% 3.57%, #406adc 16%, #6a45be 47%, transparent 100%);
        border-radius: 6px;
      }

      .icon-dot {
        width: 20px;
        height: 20px;
        position: absolute;
        left: 6px;
        top: 6px;
        background: $color-white;
        border-radius: 50%;
      }
    }

    /* Twitter */
    &.twitter {
      overflow: hidden;

      .icon-bird {
        width: 28.76px;
        height: 26px;
        position: absolute;
        left: 1.67px;
        top: 3px;
        background: $color-white;
        // Twitter bird shape would need SVG for accuracy
      }
    }

    /* WhatsApp */
    &.whatsapp {
      .icon-bg-gray {
        width: 28px;
        height: 28px;
        position: absolute;
        left: 2px;
        top: 3px;
        background: #bfc8d0;
        border-radius: 50%;
      }

      .icon-bg-green {
        width: 24px;
        height: 24px;
        position: absolute;
        left: 4px;
        top: 4px;
        background: linear-gradient(227deg, #5bd066 0%, #27b43e 100%);
        border-radius: 50%;
      }

      .icon-bg-white {
        width: 28px;
        height: 28px;
        position: absolute;
        left: 2px;
        top: 2px;
        background: $color-white;
        border-radius: 50%;
      }

      .icon-dot-white {
        width: 14.64px;
        height: 13.44px;
        position: absolute;
        left: 8.78px;
        top: 8.89px;
        background: $color-white;
        border-radius: 50%;
      }
    }
  }

  /* === BOTTOM SECTION === */
  &__bottom {
    @include flex(row, space-between, center);
    padding-top: 40px;
    border-top: 1px solid rgba($gray-700, 0.5);

    @include mobile {
      @include flex(column, center, center, 16px);
      text-align: center;
    }
  }

  &__copyright {
    @include text(medium, 400, $gray-400);
  }

  &__legal {
    @include flex(row, center, center, 8px);
  }

  &__legal-item {
    @include text(medium, 400, $gray-400);
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: $color-white;
    }
  }

  &__legal-separator {
    width: 5.25px;
    height: 5.25px;
    background: $gray-400;
    border-radius: 50%;
  }
}
</style>
