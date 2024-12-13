<template>
  <div class="dashboard-canvas mx-3" >
    <div class="canvas-header d-flex justify-content-between text-center align-items-center">
      <div class="dashboard-canvas-title">
        <h1>Dashboard - {{ title }}</h1>
      </div>
      <div class="pdf-btn btn btn-primary btn-sm" @click="downloadPdf">Download pdf</div>
    </div>
    <GridStackItemsComponent class="gridStack-items" ref="gridStackItemsComponent" :title="title"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import GridStackItemsComponent from './gridStackItemsComponent.vue';
import { useGridStackStore } from '@/stores/useGridStackStore';

const gridStackItemsComponent = ref(null);
const gridStackStore = useGridStackStore();

onMounted(() => {
  gridStackStore.setGridStackItemsComponent(gridStackItemsComponent.value);
})

const props = defineProps({
  title: String
});

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

.pdf-btn{ 
  background-color: #1C4C74 !important;
  border: none !important;
}

@media print {
  /* Hide all elements except for the dashboard canvas */
  body * {
    visibility: hidden;
  }

  .dashboard-canvas, .dashboard-canvas * {
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
