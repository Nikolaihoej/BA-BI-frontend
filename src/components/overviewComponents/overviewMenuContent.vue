<template>
    <div class="p-2">
        <div class="board-title pt-4 fs-4">Mine Boards</div>
        <div class="board-container mt-4">
            <router-link v-for="board in mineBoards" :key="board.id" :to="`/dashboard/${board.title}`" class="board-content d-flex align-items-center fs-5 p-2">
                {{ board.title }}
            </router-link>
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
</script>

<style>
.board-container {
    width: 100%;
    height: auto;
}

.board-content {
    text-decoration: none;
    color: black;
    margin-bottom: 15px;
    background-color: white;
    border-radius: 4px;
    transition: ease-in-out 0.2s;
}

.board-content:hover {
    background-color: #f0f0f0cb;
}
</style>