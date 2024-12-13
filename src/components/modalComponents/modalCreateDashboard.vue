<template>
    <div class="modal-create-content">
        <div class="modal-header">
            <h5 class="modal-title">Opret dit dashboard</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
            <form>
                <div class="mb-3">
                    <label for="dashboardTitle" class="form-label">Dashboard Titel</label>
                    <input type="text" class="form-control" id="dashboardTitle" v-model="dashboardTitle">
                </div>
                <div class="mb-3">
                    <label for="dashboardCategory" class="form-label">Vælg kategori</label>
                    <select class="form-select" id="dashboardCategory" v-model="dashboardCategory">
                        <option value="" disabled>Vælg en kategori</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary create-dashboard-btn" @click="saveDashboard" :disabled="isSaveDisabled">Skab Dashboard</button>
        </div>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import { useDashboardStore } from '../../stores/useDashboardStore';
import { useRouter } from 'vue-router';

const DashboardStore = useDashboardStore();
const router = useRouter();

const dashboardTitle = ref('');
const dashboardCategory = ref('');
const categories = ref([
  { id: 'mine', name: 'Mine Boards' },
]);

const isSaveDisabled = computed(() => !dashboardCategory.value);

const closeModal = () => {
  DashboardStore.closeModal();
};

const saveDashboard = () => {
  DashboardStore.addDashboard(dashboardTitle.value, dashboardCategory.value);
  closeModal();
  DashboardStore.showDashboard();
  router.push(`/dashboard/${dashboardTitle.value}`);
};
</script>

<style>
.modal-create-content {
    background-color: #648CAC;
    color: white;
}

.create-dashboard-btn {
    background-color: #1C4C74 !important;
}
</style>