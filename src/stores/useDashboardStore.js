// store.js
import { defineStore } from 'pinia';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    showModal: false,
    modalContent: '',
    showDashboardCanvas: false,
    dashboards: [],
  }),
  actions: {
    openModal(content) {
      this.modalContent = content;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.modalContent = '';
    },
    showDashboard() { 
      this.showDashboardCanvas = true;
    },
    addDashboard(title, category) {
      this.dashboards.push({ id: this.dashboards.length + 1, title, category });
    },
  }
});