<template>
    <div class="dropdown-container">
        <div @click="toggleDropdown" class="dropdown-button d-flex justify-content-between align-items-center">Vælg chart<i :class="`bi ${isOpen ? 'bi-chevron-down rotate' : 'bi-chevron-down'}`"></i></div>
        <div v-if="isOpen" class="dropdown-menu d-flex justify-content-center flex-wrap">
            <div class="dropdown-chart-container" @click="openModal('modalBarChart')">
                <div class="chart-image-container d-flex justify-content-center align-items-center">
                    <img src="../../assets/images/barChartImage.png" alt="Bar Chart" class="chart-image">
                </div>
            </div>
            <div class="dropdown-chart-container" @click="openModal('modalLineChart')">
                <div class="chart-image-container d-flex justify-content-center align-items-center">
                    <img src="../../assets/images/lineChartImage.png" alt="Line Chart" class="chart-image">
                </div>
            </div>
            <div class="dropdown-chart-container" @click="openModal('modalPieChart')">
                <div class="chart-image-container d-flex justify-content-center align-items-center">
                    <img src="../../assets/images/pieChartImage.png" alt="Pie Chart" class="chart-image">
                </div>
            </div>
        </div>
    </div>
    <modalContainer v-if="openModal"/>

</template>

<script setup>
import { ref } from 'vue';
import { useDashboardStore } from '../../stores/useDashboardStore';
import modalContainer from '../modalComponents/modalContainer.vue';

const isOpen = ref(false);
const isModalOpen = ref(false);
const currentChart = ref('');
const dashboardStore = useDashboardStore();

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const openModal = (chartType) => {
  currentChart.value = chartType;
  dashboardStore.openModal(chartType);
  isModalOpen.value = true;
};
</script>

<style scoped>
.dropdown-container {
position: relative;
padding: 10px;
background-color: #6cb4e4;
width: 100%;
cursor: pointer;
margin-top: 50px;
}

.dropdown-button i {
    transition: transform 0.3s ease;
}

.rotate {
    transform: rotate(180deg);
}

.dropdown-menu {
width: 100%;
display: block;
background-color: white;
top: 43px;
left: 0;
border-radius: 0;
background-color: #6cb4e4;
border: none;
}

.dropdown-chart-container {
padding: 8px;
cursor: pointer;
}

.dropdown-item:hover {
background-color: #ddd;
}

.chart-image-container {
min-width: 125px;
width: 100%;
height: 100px;
border-radius: 4px;
background-color: White;
}

.chart-image {
  max-width: 125px;
  height: 100%;
  object-fit: contain;
}
</style>