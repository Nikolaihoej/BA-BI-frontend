// src/store.js
import { defineStore } from "pinia";
import axios from "axios";

export const useApiStore = defineStore("apiStore", {
    state: () => ({
        allData: [],
        activityData: [],
        jwtToken: localStorage.getItem("jwtToken") || null,
    }),
    actions: {
        async fetchCustomersData() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/all");
                this.allData = response.data;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        async uploadCSV(file) {
            try {
                const formData = new FormData();
                formData.append("csv_file", file);

                const response = await axios.post("http://127.0.0.1:8000/api/csv", formData);

                return response.data;
            } catch (error) {
                console.error("Error uploading file:", error);
                throw error;
            }
        },
        async login(email, password) {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/login",
                    {
                        email,
                        password,
                    }
                );

                // Store the JWT token
                this.jwtToken = response.data.token; // saves the token in jwtToken
                localStorage.setItem("jwtToken", this.jwtToken);
                axios.defaults.headers.common["Authorization"] = `Bearer ${this.jwtToken}`;

                return response.data;
            } catch (error) {
                console.error("Login failed:", error);
                throw error;
            }
        },
    },
});
