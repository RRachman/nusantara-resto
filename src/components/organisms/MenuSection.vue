<template>
  <section class="menu-section">
    <div class="menu-section__container">
      <div class="menu-section__header">
        <h2 class="menu-section__title">Today Menu</h2>

        <div class="menu-section__controls">
          <!-- Search -->
          <div class="search-box">
            <input v-model="searchQuery" type="text" placeholder="Search menu..." class="search-input" />
          </div>

          <!-- Filter -->
          <div class="filter-dropdown" :class="{ active: isDropdownOpen }">
            <button class="dropdown-toggle" @click="toggleDropdown">
              <span>{{ getActiveCategoryName }}</span>
              <div class="dropdown-arrow">▼</div>
            </button>

            <div class="dropdown-menu">
              <button v-for="category in categories" :key="category.id" :class="['dropdown-item', { active: activeCategory === category.id }]" @click="setActiveCategory(category.id)">
                {{ category.name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="menu-section__content">
        <!-- Loading -->
        <div v-if="loading" class="loading-state">
          <MealCardSkeleton v-for="n in 12" :key="n" />
        </div>

        <!-- Error -->
        <div v-else-if="error" class="error-state">
          <p>Failed to load menu</p>
          <button @click="loadInitialMenu" class="btn-primary">Try Again</button>
        </div>

        <!-- Empty -->
        <div v-else-if="!filteredItems.length" class="empty-state">
          <div class="empty-icon">🍽️</div>
          <h3>No Menu Available</h3>
          <p>{{ getEmptyMessage }}</p>
          <button v-if="activeCategory !== 'all'" @click="setActiveCategory('all')" class="btn-primary">View All Menu</button>
        </div>

        <!-- Menu Items -->
        <template v-else>
          <div class="menu-grid">
            <MealCard v-for="item in displayedItems" :key="item.idMeal" :meal="item" :price="getRandomPrice()" />
          </div>

          <!-- Load More -->
          <div v-if="hasMoreItems" class="load-more-section">
            <button @click="loadMoreItems" :disabled="loadingMore" class="btn-load-more">
              <span v-if="loadingMore">
                <div class="loading-spinner"></div>
                Loading More Items...
              </span>
              <span v-else> Load More Items ({{ remainingItems }} more) </span>
            </button>
            <p class="load-more-text">Showing {{ displayedItems.length }} of {{ totalItems }} items</p>
          </div>

          <!-- No More Items -->
          <div v-else class="no-more-items">
            <p>🎉 All {{ totalItems }} items loaded</p>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import MealCard from '../atoms/MealCard.vue';
import MealCardSkeleton from '../atoms/MealCardSkeleton.vue';
import { mealService } from '@/services/mealService';

const CATEGORIES = [
  { id: 'all', name: 'All Menu' },
  { id: 'Beef', name: 'Beef' },
  { id: 'Chicken', name: 'Chicken' },
  { id: 'Dessert', name: 'Dessert' },
  { id: 'Pasta', name: 'Pasta' },
  { id: 'Seafood', name: 'Seafood' },
];

export default {
  name: 'MenuSection',
  components: { MealCard, MealCardSkeleton },

  data: () => ({
    loading: false,
    loadingMore: false,
    error: false,
    activeCategory: 'all',
    searchQuery: '',
    isDropdownOpen: false,
    menuItems: [], // Semua data yang ada
    displayedCount: 12, // Yang ditampilkan
    totalItems: 0, // Total data yang tersedia
  }),

  computed: {
    categories: () => CATEGORIES,

    filteredItems() {
      let items = this.menuItems;

      if (this.activeCategory !== 'all') {
        items = items.filter((item) => item.strCategory === this.activeCategory);
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        items = items.filter((item) => item.strMeal.toLowerCase().includes(query));
      }

      return items;
    },

    displayedItems() {
      return this.filteredItems.slice(0, this.displayedCount);
    },

    hasMoreItems() {
      return this.displayedCount < this.totalItems;
    },

    remainingItems() {
      return this.totalItems - this.displayedCount;
    },

    getActiveCategoryName() {
      return this.categories.find((cat) => cat.id === this.activeCategory)?.name || 'All Menu';
    },

    getEmptyMessage() {
      if (this.searchQuery) return `No results for "${this.searchQuery}"`;
      return this.activeCategory === 'all' ? 'No menu items available' : `No ${this.activeCategory.toLowerCase()} items`;
    },
  },

  async mounted() {
    await this.loadInitialMenu();
    document.addEventListener('click', this.handleClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },

  methods: {
    setActiveCategory(category) {
      this.activeCategory = category;
      this.isDropdownOpen = false;
      this.displayedCount = 12; // Reset ke 12 item saat ganti kategori
    },

    toggleDropdown(event) {
      event.stopPropagation();
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },

    getRandomPrice() {
      return (Math.floor(Math.random() * 18) + 8).toFixed(2);
    },

    // Load data awal (12 items)
    async loadInitialMenu() {
      this.loading = true;
      this.error = false;

      try {
        const meals = await mealService.getInitialMeals();
        this.menuItems = meals;
        this.totalItems = meals.length;
        this.displayedCount = 12; // Tampilkan 12 item pertama
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    // Load More - Fetch data tambahan dari API
    async loadMoreItems() {
      this.loadingMore = true;

      try {
        // FETCH DATA BARU dari API
        const result = await mealService.getMoreMeals();

        // Update data
        this.menuItems = result.allMeals;
        this.totalItems = this.menuItems.length;

        // Tampilkan 6 item tambahan
        this.displayedCount += 6;

        console.log(`Loaded ${result.newMeals.length} new meals. Total: ${this.totalItems}, Displayed: ${this.displayedCount}`);
      } catch (error) {
        console.error('Error loading more items:', error);
      } finally {
        this.loadingMore = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/mixins' as *;

.menu-section {
  padding: 100px 24px;
  background: $color-white;

  &__container {
    max-width: 1240px;
    margin: 0 auto;
    @include flex(column, flex-start, center, 56px);
  }

  &__header {
    @include flex(row, space-between, center);
    width: 100%;

    @include tablet-down {
      @include flex(column, flex-start, center, 32px);
    }
  }

  &__title {
    @include heading(h2, $font-cormorant);
    color: $gray-900;
    margin: 0;
  }

  &__controls {
    @include flex(row, flex-end, center, 16px);

    @include tablet-down {
      @include flex(column, stretch, center, 16px);
      width: 100%;
    }
  }

  &__content {
    width: 100%;
  }
}

// Search
.search-box {
  position: relative;
  min-width: 250px;

  @include tablet-down {
    width: 100%;
  }
}

.search-input {
  @include text(medium, 400, $gray-700);
  width: 100%;
  padding: 12px 16px;
  border: 1px solid $gray-300;
  border-radius: 12px;
  background: $color-white;

  &:focus {
    outline: none;
    border-color: $brand-500;
  }
}

// Dropdown
.filter-dropdown {
  position: relative;
  min-width: 180px;

  @include tablet-down {
    width: 100%;
  }

  &.active {
    .dropdown-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    .dropdown-arrow {
      transform: rotate(180deg);
    }
  }
}

.dropdown-toggle {
  @include flex(row, space-between, center, 8px);
  @include text(medium, 500, $gray-700);
  background: $color-white;
  padding: 12px 16px;
  border: 1px solid $gray-300;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
}

.dropdown-arrow {
  transition: transform 0.3s ease;
  font-size: 12px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: $color-white;
  border: 1px solid $gray-300;
  border-radius: 12px;
  margin-top: 8px;
  padding: 8px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
}

.dropdown-item {
  @include text(medium, 400, $gray-700);
  background: transparent;
  border: none;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &.active {
    background: $brand-500;
    color: $gray-900;
    font-weight: 600;
  }
}

// Content
.loading-state,
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 24px;

  @include tablet-down {
    grid-template-columns: 1fr;
  }
}

.error-state,
.empty-state {
  text-align: center;
  padding: 60px 20px;
  @include flex(column, center, center, 24px);
}

.empty-state {
  h3 {
    @include heading(h4, $font-cormorant);
    color: $gray-900;
    margin: 0;
  }

  p {
    @include text(large, 400, $gray-600);
    margin: 0;
  }
}

.empty-icon {
  font-size: 64px;
}

// Load More Section
.load-more-section {
  text-align: center;
  margin-top: 60px;
  padding: 40px 20px;
  border-top: 1px solid $gray-200;
}

.btn-load-more {
  @include flex(row, center, center, 8px);
  @include text(medium, 600, $gray-900);
  background: $brand-500;
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;

  &:hover:not(:disabled) {
    background: $brand-600;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba($brand-500, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid $gray-900;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.load-more-text {
  @include text(small, 400, $gray-500);
  margin-top: 12px;
}

.no-more-items {
  text-align: center;
  margin-top: 40px;
  padding: 20px;

  p {
    @include text(medium, 400, $gray-500);
  }
}

// Buttons
.btn-primary {
  @include text(medium, 500, $gray-900);
  background: $brand-500;
  padding: 12px 24px;
  border: none;
  border-radius: $radius-base;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

// Mobile
@include mobile {
  .menu-section {
    padding: 60px 16px;

    &__container {
      gap: 32px;
    }

    &__title {
      @include heading(h3, $font-cormorant);
    }

    .empty-icon {
      font-size: 48px;
    }

    .load-more-section {
      margin-top: 40px;
      padding: 30px 16px;
    }

    .btn-load-more {
      min-width: 160px;
      padding: 14px 24px;
    }
  }
}
</style>
