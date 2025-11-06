<template>
  <section class="about">
    <div class="about__container">
      <template v-for="(item, index) in aboutItems" :key="index">
        <div class="about__item">
          <div class="about__icon">
            <div class="about__shape"></div>
          </div>
          <div class="about__text">
            <h3 class="about__title">{{ item.title }}</h3>
            <p class="about__desc">{{ item.desc }}</p>
          </div>
        </div>

        <!-- Divider di antara item, tapi tidak di akhir -->
        <div v-if="index < aboutItems.length - 1" class="about__divider"></div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutUs',
  data() {
    return {
      aboutItems: [
        {
          title: 'Special Offers in every meal',
          desc: 'Enjoy exclusive deals on your favorite meals.',
        },
        {
          title: 'Nutritious Ingredients',
          desc: 'Our dishes are crafted from farm-fresh, wholesome ingredients.',
        },
        {
          title: 'Fast & Friendly Service',
          desc: 'Get your meals served hot and fresh by our welcoming staff.',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/mixins' as *;

.about {
  background-color: $color-black;
  color: $color-white;
  padding: 85px 62px 50px;
  display: flex;
  justify-content: center;

  &__container {
    @include flex(row, center, center, 18px);
    flex-wrap: wrap;
    max-width: 1200px;
    width: 100%;
  }

  &__item {
    @include flex(row, flex-start, center, 1px);
    flex: 1 1 120px;
    min-width: 280px;

    @include mobile {
      @include flex(column, center, center, 1px);
      text-align: center;
    }
  }

  &__icon {
    width: 104px;
    height: 104px;
    background-color: rgba($color-white, 0.1);
    border-radius: 50%;
    @include flex();
    flex-shrink: 0;

    @include mobile {
      width: 80px;
      height: 80px;
    }

    .about__shape {
      width: 52px;
      height: 52px;
      background-color: $color-primary;
      border-radius: $radius-base;

      @include mobile {
        width: 40px;
        height: 40px;
      }
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;

    @include mobile {
      @include center-flex;
    }
  }

  &__title {
    @include heading(h6, $font-cormorant);
    font-weight: 600;
    color: $color-white;

    @include mobile {
      @include heading(h5, $font-cormorant);
      font-weight: 600;
    }
  }

  &__desc {
    @include text(medium, 400, rgba($color-white, 0.7));
    max-width: 260px;

    @include mobile {
      @include text(small, 400, rgba($color-white, 0.7));
    }
  }

  &__divider {
    width: 1px;
    height: 80px;
    background-color: rgba($color-white, 0.2);

    @include mobile {
      display: none;
    }
  }

  // Responsive
  @include tablet-down {
    padding: 60px 32px;

    &__container {
      gap: 32px;
    }
  }

  @include mobile {
    padding: 40px 24px;

    &__container {
      @include flex(column, center, center, 40px);
    }

    &__item {
      min-width: auto;
      width: 100%;
      max-width: 280px;
    }
  }
}
</style>
