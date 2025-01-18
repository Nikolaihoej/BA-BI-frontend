// store.js
import { defineStore } from "pinia";
import axios from "axios";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        showModal: false,
        modalContent: "",
        showDashboardCanvas: false,
        dashboards: [],
        selectedDashboardTitle: "",
    }),
    actions: {
        openModal(content) {
            this.modalContent = content;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.modalContent = "";
        },
        showDashboard(title) {
            // Update this method
            this.selectedDashboardTitle = title;
            this.showDashboardCanvas = true;
        },
        addDashboard(title, category, id) {
            this.dashboards.push({
                id,
                title,
                category,
            });
            this.showDashboard(title); // Show the newly added dashboard
        },
         //ny funktion
        findDashboard(id) {
            const foundDashboard = this.dashboards.find(dashboard => dashboard.id === id);
			return foundDashboard;
		},
        async loadSelectedDashboard(id) {
            const response = await axios.get(`http://127.0.0.1:8000/api/getdashboard/${id}`);
            const dashboard = response.data;
            const foundDashboard = this.findDashboard(dashboard.id);

            if (!this.findDashboard(dashboard.id)) {
                this.addDashboard(
					dashboard.title,
                    dashboard.category,
					dashboard.id
                );
            } else {
                this.selectedDashboardTitle = foundDashboard.title;
                this.showDashboardCanvas = true;
            }
        },
        async loadAllDashboards() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/getdashboards');
                const dashboards = response.data;
                for (const dashboard of dashboards) {
                    if (!this.findDashboard(dashboard.id)) {
                        this.dashboards.push(dashboard);
                    }
                }
            } catch (error) {
                console.error('Error loading dashboards:', error);
            }
        },
		async deleteDashboard(id) {
			try { 
				const dashboard = this.findDashboard(id);
				const response = await axios.delete(`http://127.0.0.1:8000/api/dashboard/${dashboard.id}`);
				this.dashboards = this.dashboards.filter(filteredDashboard => filteredDashboard.id !== dashboard.id);
			} catch (error) {
				console.error('Error deleting dashboard:', error);
			}
		},
		async updateDashboardTitle(id, newTitle) {
            try {
				const response = await axios.get("http://127.0.0.1:8000/api/getdashboard/"+id);
				const dashboard = response.data;

                if (dashboard) {
                    const response = await axios.put(`http://127.0.0.1:8000/api/dashboard/${dashboard.id}/title`, {
                        title: newTitle,
                    });
					this.replaceDashboard(dashboard.id, response.data);
                    this.selectedDashboardTitle = newTitle;
                }
            } catch (error) {
                console.error('Error updating dashboard title:', error);
            }
        },

		replaceDashboard(id, newDashboard) {
			const index = this.dashboards.findIndex(dashboard => dashboard.id === id);
			this.dashboards[index] = newDashboard;
		}

    },
});
