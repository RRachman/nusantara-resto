import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Cache management
let mealCache = [];
let cacheTimestamp = null;
const CACHE_DURATION = 3600000; // 1 jam

export const mealService = {
  // Tambahkan method ini
  async getRandomMeals(count = 3) {
    try {
      console.log(`Fetching ${count} random meals for Best Seller`);

      const requests = Array(count)
        .fill()
        .map(() => axios.get(`${BASE_URL}/random.php`));

      const responses = await Promise.all(requests);
      const meals = responses.map((response) => response.data.meals[0]);

      console.log('Random meals fetched:', meals);
      return meals;
    } catch (error) {
      console.error('Error fetching random meals:', error);
      throw new Error('Failed to load random meals');
    }
  },
  // Get initial meals (12 items)
  async getInitialMeals() {
    try {
      // Cek cache dulu
      if (this.isCacheValid()) {
        console.log('Using cached meals');
        return this.getFromCache();
      }

      console.log('Fetching initial meals from API');
      const requests = Array(12)
        .fill()
        .map(() => axios.get(`${BASE_URL}/random.php`));

      const responses = await Promise.all(requests);
      const meals = responses.map((response) => response.data.meals[0]);

      // Simpan ke cache
      this.setCache(meals);

      return meals;
    } catch (error) {
      console.error('Error fetching initial meals:', error);
      throw new Error('Failed to load meals from API');
    }
  },

  // Get MORE meals untuk Load More (6 items baru)
  async getMoreMeals() {
    try {
      console.log('Fetching MORE meals from API for Load More');

      // Fetch 6 meal baru
      const requests = Array(6)
        .fill()
        .map(() => axios.get(`${BASE_URL}/random.php`));

      const responses = await Promise.all(requests);
      const newMeals = responses.map((response) => response.data.meals[0]);

      // Gabung dengan data yang sudah ada di cache
      const currentMeals = this.getFromCache();
      const allMeals = [...currentMeals, ...newMeals];
      const uniqueMeals = this.removeDuplicates(allMeals);

      // Update cache dengan data yang lebih banyak
      this.setCache(uniqueMeals);

      return {
        newMeals: newMeals,
        allMeals: uniqueMeals,
      };
    } catch (error) {
      console.error('Error fetching more meals:', error);
      throw new Error('Failed to load more meals');
    }
  },

  // Get meals by category
  async getMealsByCategory(category, count = 6) {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
      const mealIds = response.data.meals.slice(0, count).map((meal) => meal.idMeal);

      const detailRequests = mealIds.map((id) => axios.get(`${BASE_URL}/lookup.php?i=${id}`));

      const detailResponses = await Promise.all(detailRequests);
      return detailResponses.map((response) => response.data.meals[0]);
    } catch (error) {
      console.error('Error fetching meals by category:', error);
      throw new Error(`Failed to load ${category} meals`);
    }
  },

  // Search meals by name
  async searchMeals(query) {
    try {
      const response = await axios.get(`${BASE_URL}/search.php?s=${query}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error searching meals:', error);
      throw new Error('Failed to search meals');
    }
  },

  // Cache management
  isCacheValid() {
    return mealCache.length > 0 && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION;
  },

  getFromCache() {
    return [...mealCache];
  },

  setCache(meals) {
    mealCache = this.removeDuplicates(meals);
    cacheTimestamp = Date.now();

    // Simpan ke localStorage
    try {
      localStorage.setItem('mealCache', JSON.stringify(mealCache));
      localStorage.setItem('mealCacheTime', cacheTimestamp.toString());
    } catch (e) {
      console.warn('Failed to save cache to localStorage');
    }
  },

  loadFromLocalStorage() {
    try {
      const cached = localStorage.getItem('mealCache');
      const timestamp = localStorage.getItem('mealCacheTime');

      if (cached && timestamp && Date.now() - parseInt(timestamp) < CACHE_DURATION) {
        mealCache = JSON.parse(cached);
        cacheTimestamp = parseInt(timestamp);
        return true;
      }
    } catch (e) {
      console.warn('Failed to load cache from localStorage');
    }
    return false;
  },

  removeDuplicates(meals) {
    const seen = new Set();
    return meals.filter((meal) => {
      if (seen.has(meal.idMeal)) return false;
      seen.add(meal.idMeal);
      return true;
    });
  },

  // Get total cached items count
  getCachedCount() {
    return mealCache.length;
  },

  // Clear cache
  clearCache() {
    mealCache = [];
    cacheTimestamp = null;
    try {
      localStorage.removeItem('mealCache');
      localStorage.removeItem('mealCacheTime');
    } catch (e) {
      console.warn('Failed to clear localStorage cache');
    }
  },
};

// Load cache saat service di-load
mealService.loadFromLocalStorage();
