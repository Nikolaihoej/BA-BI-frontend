// src/store.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useApiStore = defineStore('apiStore', {
  state: () => ({
    allData: [],
    activityData: [],
    jwtToken: null,
  }),
  actions: {
    async fetchCustomersData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/all');
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

        const response = await axios.post('http://127.0.0.1:8000/api/csv', formData);

        return response.data;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    },
    async getCSRFToken() {
      try {
        console.log('Fetching CSRF token from http://127.0.0.1:8000/csrf-token');
        const response = await axios.get('http://127.0.0.1:8000/csrf-token');
        console.log('CSRF token fetched successfully:', response.data);
        return response.data.csrfToken;
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
      }
    },
    async login(email, password) {
      try {
        // const csrfToken = await this.getCSRFToken();
        // axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
        
        const response = await axios.post('http://127.0.0.1:8000/login', {
          email,
          password
        });

        // Store the JWT token
        this.jwtToken = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.jwtToken}`;

        console.log('Login successful:', response.data);
        return response.data;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
  }
});