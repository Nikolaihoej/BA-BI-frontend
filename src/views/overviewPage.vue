<template>
    <navBar />
    <div class="d-flex content">
        <sideMenu :page="currentPage"/>
        <userDashboards />
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import navBar from '../components/navBar.vue';
import sideMenu from '../components/sideMenu.vue';
import userDashboards from '../components/userDashboards.vue';
import { useDashboardStore } from '@/stores/useDashboardStore';


const currentPage = ref('oversigt');

const dashboardStore = useDashboardStore();

onMounted(() => {
    dashboardStore.loadAllDashboards();
});

</script>


<style>
</style>