<template>
    <div class="dashboard-canvas mx-3">
        <div class="canvas-header d-flex justify-content-between text-center align-items-center">
            <div class="dashboard-canvas-title d-flex">
                <h1 v-if="!isEditing">
                    Dashboard - {{ dashboardStore.selectedDashboardTitle }}
                </h1>
                <input class="edit-title" v-else v-model="newTitle" @blur="saveTitle" @keyup.enter="saveTitle"/>
                <i v-if="!isEditing" class="bi bi-pencil mx-1" @click="editTitle"></i>
                <i v-else class="bi bi-floppy2-fill mx-1" @click="saveTitle"></i>
            </div>
            <div class="pdf-btn btn btn-primary btn-sm" @click="downloadPdf">Download pdf</div>
        </div>
      <GridStackItemsComponent class="gridStack-items" ref="gridStackItemsComponent" :title="title"/>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import GridStackItemsComponent from "./gridStackItemsComponent.vue";
import { useGridStackStore } from "@/stores/useGridStackStore";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { useRoute } from "vue-router";

const gridStackItemsComponent = ref(null);
const gridStackStore = useGridStackStore();
const dashboardStore = useDashboardStore();

const title = computed(() => title.value);

const isEditing = ref(false);
const newTitle = ref(dashboardStore.selectedDashboardTitle);

onMounted(() => {
    const route = useRoute();
    dashboardStore.loadSelectedDashboard(route.params.id);
    gridStackStore.setGridStackItemsComponent(gridStackItemsComponent.value);
});

const route = useRoute();

const props = defineProps({
    title: String,
});

const editTitle = () => {
    isEditing.value = true;
    newTitle.value = dashboardStore.selectedDashboardTitle;
};

const saveTitle = async () => {
    if (newTitle.value) {
        await dashboardStore.updateDashboardTitle(
            route.params.id,
            newTitle.value
        );
    }
    isEditing.value = false;
};

const downloadPdf = () => {
    window.print();
};
</script>

<style>
.dashboard-canvas {
    background-color: white;
    width: 100%;
}

.canvas-header {
    border-bottom: 3px solid black;
}

.pdf-btn {
    background-color: #1c4c74 !important;
    border: none !important;
}

.edit-title {
    border: none;
    outline: none;
    background-color: transparent;
    color: black;
    font-size: 2.5rem;
    max-width: 300px;
}

@media print {
    /* Hide all elements except for the dashboard canvas */
    body * {
        visibility: hidden;
    }

    .dashboard-canvas,
    .dashboard-canvas * {
        visibility: visible;
    }

    .dashboard-canvas {
        position: absolute;
        top: 0;
        .btn {
            display: none;
        }
        .grid-stack-item {
            width: 100% !important;
        }
    }
}
</style>
