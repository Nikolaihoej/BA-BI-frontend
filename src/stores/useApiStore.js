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
        const response = await axios.get('http://188.245.207.39:8080/api/all');
        this.allData = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async uploadCSV(file) {
      try {
        const formData = new FormData();
        formData.append('csv_file', file);

        const response = await axios.post('http://127.0.0.1:8080/api/csv', formData );

        return response.data;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    }
  }
});