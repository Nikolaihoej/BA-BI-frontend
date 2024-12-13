// src/store.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useApiStore = defineStore('apiStore', {
  state: () => ({
    allData: [],
    activityData: []
  }),
  actions: {
    async fetchCustomersData() {
      try {
        const response = await axios.get('http://188.245.207.39/api/all');
        this.allData = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
});