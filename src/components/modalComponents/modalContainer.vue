<template>
    <div v-if="showModal">
        <div class="modal-backdrop fade" :class="{ 'show': showModal }"></div>
        <div class="modal" :class="{ 'show d-block': showModal }" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div v-if="content === 'createDashboard'">
                        <DashboardModalContent />
                    </div>
                    <div v-if="content === 'modalLineChart'">
                        <LineChartModalContent />
                    </div>
                    <div v-if="content === 'modalBarChart'">
                        <BarChartModalContent />
                    </div>
                    <div v-if="content === 'modalPieChart'">
                        <PieChartModalContent />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useDashboardStore } from '../../stores/useDashboardStore';
import DashboardModalContent from './modalCreateDashboard.vue';
import LineChartModalContent from './modalLineChart.vue';
import BarChartModalContent from './modalBarChart.vue';
import PieChartModalContent from './modalPieChart.vue';


const DashboardStore = useDashboardStore();
const showModal = computed(() => DashboardStore.showModal);
const content = computed(() => DashboardStore.modalContent);
</script>

<style>
.modal {
    display: none;
}
.modal-backdrop {
    display: none;
}
.modal-backdrop.show {
    display: block;
}

.modal.show.d-block {
    display: block;
}
</style>