// src/stores/confirmStore.js
import { defineStore } from 'pinia';

export const useConfirmStore = defineStore('confirm', {
  state: () => ({
    isConfirmOpen: false,
    confirmData: null,
    callback: null,
  }),

  actions: {
    openConfirm(data, callback) {
      console.log('Opening confirm popup with data:', data);
      this.isConfirmOpen = true;
      this.confirmData = data;
      this.callback = callback;
    },

    closeConfirm() {
      console.log('Closing confirm popup');
      this.isConfirmOpen = false;
      this.confirmData = null;
      this.callback = null;
    },

    confirmAction() {
      console.log('Confirm action triggered');
      if (this.callback) {
        this.callback();
      } else {
        console.warn('No callback provided for confirm action');
      }
      this.closeConfirm();
    },
  },
});
