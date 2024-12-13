<template>
  <div v-if="mineBoards.length > 0" class="dashboard-cards-container">
    <router-link v-for="board in mineBoards" :key="board.id" :to="`/dashboard/${board.title}`" class="dashboard-card">
      <div class="dashboard-card-content">
        <div class="dashboard-card-items p-2">
          Dashboard - {{ board.title }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useDashboardStore } from '../../stores/useDashboardStore';

  const DashboardStore = useDashboardStore();

  const mineBoards = computed(() => {
      return DashboardStore.dashboards.filter(board => board.category === 'mine');
  });
</script>

<style scoped>

.dashboard-cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Adjust the gap between cards as needed */
}

.dashboard-card-content {
  width: 230px;
  max-width: 230px;
  height: 85px;
  background-color: #354551;
  padding: 12px 6px;
  cursor: pointer;
}

.dashboard-card {
  text-decoration: none;
}

.dashboard-card-items {
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-decoration: none;
}

</style>