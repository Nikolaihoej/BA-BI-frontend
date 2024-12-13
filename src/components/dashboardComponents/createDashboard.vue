<template>
    <div class="dashboard-card" @click="openModal('createDashboard')">
        <div class="create-icon">
            <i class="bi bi-plus-lg"></i>
        </div>
    </div>
    <modalContainer v-if="openModal"  />
</template>

<script setup>
import { useDashboardStore } from '../../stores/useDashboardStore';
import modalContainer from '../modalComponents/modalContainer.vue';

const DashboardStore = useDashboardStore();

const openModal = () => {
    DashboardStore.openModal("createDashboard");
};
</script>

<style scoped>
.dashboard-card {
    width: 100%;
    max-width: 230px;
    height: 85px;
    background-color: #354551;
    padding: 12px 6px;
    margin-left: 10px;
    cursor: pointer;
}

.create-icon {
    font-size: 45px;
    font-weight: 600;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>