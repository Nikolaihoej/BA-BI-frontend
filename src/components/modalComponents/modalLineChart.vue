<template>
  <div class="modal-create-content">
    <div class="modal-header">
      <h5 class="modal-title">Oprat line chart</h5>
      <button type="button" class="btn-close" @click="closeModal"></button>
    </div>
    <div class="modal-body">
      <div class="mb-3">
        <label class="form-label">Vælg data punkter</label>
        <div class="modal-checkpoint-container d-flex justify-content-around ">
          <div class="left-container-labels"> Vælg en kategori
            <div class="checkbox-container">
              <input type="checkbox" class="checkbox-size" v-model="selectedLabels.age">
              <label for="age">Alder</label>
            </div>
            <div class="checkbox-container">
              <input type="checkbox" class="checkbox-size" v-model="selectedLabels.TrainingSessionsThisMonth">
              <label for="trainingSessionsThisMonth">Trænings sessioner i sidste måned</label>
            </div>
          </div>
          <div class="right-container-data"> Vælg data
            <div class="checkbox-container">
              <input type="checkbox" class="checkbox-size" v-model="selectedPoints.count">
              <label for="signupDate">Alle kunder</label>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="create-chart-btn btn btn-primary" :disabled="!canCreateChart" @click="createChart">Skab Chart</button>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-light" @click="closeModal">Luk menu</button>
    </div>
  </div>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import { useApiStore } from '@/stores/useApiStore';
import { useGridStackStore } from '@/stores/useGridStackStore';
import { useDashboardStore } from '@/stores/useDashboardStore';

const apiStore = useApiStore();
const gridStackStore = useGridStackStore();
const dashboardStore = useDashboardStore();

const selectedLabels = ref({
  age: false,
  TrainingSessionsThisMonth: false,
  // Signup_Date: false,

});

const selectedPoints = ref({
  count: false,
});

const count = (data, label) => {
  let countmap = {};

  const values = data.map(item => {
    const keys = label.split('.');
    let value = item;
    keys.forEach(key => {
      value = value[key];
    });
    return value;
  });

  values.forEach(value => {
    countmap[value] = countmap[value] ? countmap[value] + 1 : 1;
  });

  return { labels: Object.keys(countmap), data: Object.values(countmap) };
  
};

const createChart = async () => {
  await apiStore.fetchCustomersData();
  
  let label = "";
  const result = {}; 
  
  if (selectedLabels.value.age) {
    label = "customer.Age";
  } else if (selectedLabels.value.TrainingSessionsThisMonth) {
    label = "activity_status.TrainingSessionsThisMonth";
  }
  
  if (selectedPoints.value.count) {
    result.labels = count(apiStore.allData, label).labels;
    result.data = count(apiStore.allData, label).data;
  }
  
  gridStackStore.addComponent('lineChartComponent', result);
  
  closeModal();
};

const canCreateChart = computed(() => {
  return (selectedLabels.value.age || selectedLabels.value.TrainingSessionsThisMonth) && selectedPoints.value.count;
});

const closeModal = () => {
    dashboardStore.closeModal();
};
</script>
  
<style scoped>
.modal-create-content {
    background-color: #648CAC;
    color: white;
    border: none;
    border-radius: 6px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.create-chart-btn {
  background-color: #1C4C74 !important;
  border: none !important;
}

.checkbox-size {
  width: 20px;
  height: 20px;
  
}
</style>