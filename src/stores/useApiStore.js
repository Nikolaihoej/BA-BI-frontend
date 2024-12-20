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

        const response = await axios.post('http://188.245.207.39:8080/api/csv', formData);

        return response.data;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    },
    async getCSRFToken() {
      try {
        console.log('Fetching CSRF token from http://188.245.207.39:8080/csrf-token');
        const response = await axios.get('http://188.245.207.39:8080/csrf-token');
        console.log('CSRF token fetched successfully:', response.data);
        return response.data.csrfToken;
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          // Request was made but no response was received
          console.error('Request data:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
        }
        throw error;
      }
    }
  }
});