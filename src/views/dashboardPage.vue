<template>
    <navBar/>
    <div class="content">
        <sideMenu :page="currentPage"/>
        <router-view v-slot="{ route }">
            <dashboardCanvas v-if="showDashboardCanvas" :key="route.params.title" :title="route.params.title"/>
        </router-view>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import navBar from '../components/navBar.vue';
import sideMenu from '../components/sideMenu.vue';
import dashboardCanvas from '../components/dashboardComponents/dashboardCanvas.vue';
import { useDashboardStore } from '../stores/useDashboardStore';
import { useRoute } from 'vue-router';

const currentPage = ref('dashboard');
const DashboardStore = useDashboardStore();
const showDashboardCanvas = computed(() => DashboardStore.showDashboardCanvas);
onMounted(() => {
    const route = useRoute();
    if (route.params.title) {
        DashboardStore.loadSelectedDashboard(route.params.title);
    }
    DashboardStore.loadAllDashboards();
});
</script>

<style scoped>
.content {
  display: flex;
}
</style>