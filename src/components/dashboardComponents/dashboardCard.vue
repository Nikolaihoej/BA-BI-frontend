<template>
  <div v-if="mineBoards.length > 0" class="dashboard-cards-container">
    <div v-for="board in mineBoards" :key="board.id" class="dashboard-card">
      <div class="dashboard-card-content">
        <div @click="deleteBoard(board.id)">
          <i class="bi bi-trash trashbin"></i>
        </div>
        <router-link :to="`/dashboard/${board.id}`" class="dashboard-card-items">
          Dashboard - {{ board.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useDashboardStore } from '../../stores/useDashboardStore';

  const DashboardStore = useDashboardStore();

  const mineBoards = computed(() => {
      return DashboardStore.dashboards.filter(board => board.category === 'mine');
  });

  const deleteBoard = async (id) => {
      await DashboardStore.deleteDashboard(id);
  };
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

.trashbin {
  display: flex;
  justify-content: flex-end;
  color: white;
  font-size: 16px;
  transition: ease-in-out 0.3s;
  z-index: 4;
}

.trashbin:hover {
  color: red;
}

.dashboard-card {
  text-decoration: none;
}

.dashboard-card-items {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-decoration: none;
}

</style>