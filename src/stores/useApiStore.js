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

        const csrfToken = await this.getCSRFToken();

        const response = await axios.post('http://127.0.0.1:8000/api/csv', formData, {
          headers: {
            // 'X-CSRF-TOKEN': csrfToken
          }
        });

        return response.data;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    },
    async getCSRFToken() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/csrf-token');
        return response.data.csrfToken;
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
      }
    }
  }
});