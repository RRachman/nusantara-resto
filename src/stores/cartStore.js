// stores/cartStore.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isCartOpen: false,
  }),

  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),

    totalPrice: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0),

    itemCount: (state) => (mealId) => {
      const item = state.items.find((item) => item.id === mealId);
      return item ? item.quantity : 0;
    },

    cartItems: (state) => state.items,
  },

  actions: {
    addToCart(meal) {
      const existingItem = this.items.find((item) => item.id === meal.idMeal);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
          price: meal.price,
          quantity: 1,
        });
      }
    },

    removeFromCart(mealId) {
      const itemIndex = this.items.findIndex((item) => item.id === mealId);

      if (itemIndex !== -1) {
        const item = this.items[itemIndex];

        if (item.quantity > 1) {
          item.quantity--;
        } else {
          this.items.splice(itemIndex, 1);
        }
      }
    },

    removeItemCompletely(mealId) {
      this.items = this.items.filter((item) => item.id !== mealId);
    },

    clearCart() {
      this.items = [];
    },

    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },

    setCartOpen(status) {
      this.isCartOpen = status;
    },
  },

  persist: true,
});
