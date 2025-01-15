// store.js
import { defineStore } from "pinia";

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
        addDashboard(title, category) {
            this.dashboards.push({
                id: this.dashboards.length + 1,
                title,
                category,
            });
            this.showDashboard(title); // Show the newly added dashboard
        },
        //ny funktion
        loadSelectedDashboard(title) {
            const dashboard = JSON.parse(
                localStorage.getItem("savedDashboard")
            );
            const foundDashboard = this.findDashboard(title);

            if (!this.findDashboard(title)) {
                this.addDashboard(
                    dashboard[dashboard.length - 1].title,
                    dashboard[dashboard.length - 1].category
                );
            } else {
                this.selectedDashboardTitle = foundDashboard.title;
                this.showDashboardCanvas = true;
            }
        },
        loadAllDashboards() {
            const dashboards = JSON.parse(
                localStorage.getItem("savedDashboard")
            );

            if (dashboards) {
                for (const dashboard of dashboards) {
                    if (!this.findDashboard(dashboard.title)) {
                        this.dashboards.push(dashboard);
                    }
                }
            }
        },
        findDashboard(title) {
            return this.dashboards.find(
                (dashboard) => dashboard.title === title
            );
        },
    },
});
