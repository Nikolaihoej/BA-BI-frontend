<template>
    <nav>
        <div class="container-fluid g-0">
            <div class="nav-box d-flex align-items-center">
                <router-link to="/oversigt" class="navbar-brand"><div class="logo fw-bold">BIEZY</div></router-link>
                <router-link to="/oversigt"><button class="btn btn-light me-2">Oversigt</button></router-link>
                <div class="boards-options-dropdown">
                    <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                        Mine boards
                    </button>
                    <ul class="dropdown-menu">
                        <li v-for="dashboard in dashboardMenu" :key="dashboard.id">
                            <router-link :to="`/dashboard/${dashboard.title}`" class="dropdown-item d-flex align-items-center fs-5 p-2">
                                {{ dashboard.title }}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <button class="create-board btn btn-primary" @click="openModal('createDashboard')">
                    Opret board
                </button>
                <div class="ms-auto d-flex text-center justify-content-center">
                    <userSettingsComponent/>
                </div>
            </div>
        </div>
    </nav>
    <modalContainer v-if="openModal"  />
</template>

<script setup>
import { computed } from 'vue';
import { useDashboardStore } from '../stores/useDashboardStore';
import modalContainer from './modalComponents/modalContainer.vue';
import userSettingsComponent from './navComponents/userSettingsComponent.vue';

const DashboardStore = useDashboardStore();

const openModal = () => {
    DashboardStore.openModal("createDashboard");
};

const dashboardMenu = computed(() => {
    return DashboardStore.dashboards.filter(dashboard => dashboard.category === 'mine');
});
</script>

<style scoped>
.nav-box {
    background-color: #648CAC;
    padding: 20px;
    color: white;
}

.logo{
    padding: 0 85px 0 65px;
    margin-bottom: 6px;
    font-size: 48px;
}

.create-board {
    background-color: #1C4C74;
    border: #1C4C74;
    margin-left: 20px;
    height: 38px;
}

.userSettings {
    background-color: #1C4C74;
    border-radius: 50%;
    width: 60px;
    height: 60px;
}
</style>