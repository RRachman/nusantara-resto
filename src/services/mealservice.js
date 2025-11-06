import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const mealService = {
  // Get multiple random meals
  async getRandomMeals(count = 6) {
    const requests = Array(count)
      .fill()
      .map(() => axios.get(`${BASE_URL}/random.php`));

    const responses = await Promise.all(requests);
    return responses.map((response) => response.data.meals[0]);
  },

  // Get meals by category
  async getMealsByCategory(category) {
    const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
    const mealIds = response.data.meals.slice(0, 6).map((meal) => meal.idMeal);

    // Get full details for each meal
    const detailRequests = mealIds.map((id) => axios.get(`${BASE_URL}/lookup.php?i=${id}`));

    const detailResponses = await Promise.all(detailRequests);
    return detailResponses.map((response) => response.data.meals[0]);
  },
};
