<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  labels: Array,
  data: Array
});

const chartCanvas = ref(null);
let chartInstance = null;

const createChart = () => {
  const ctx = chartCanvas.value.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.labels,
      datasets: [{
        label: '',
        data: props.data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};

const updateChart = () => {
  if (chartInstance) {
    chartInstance.data.labels = props.labels;
    chartInstance.data.datasets[0].data = props.data;
    chartInstance.update();
  }
};

onMounted(() => {
  createChart();
});

watch(() => props.labels, (newLabels) => {
  console.log('New Labels:', newLabels);
  updateChart();
});
watch(() => props.data, (newData) => {
  console.log('New Data:', newData);
  updateChart();
});
</script>

<style>
.chart-container {
  width: 100%;
  height: 100%;
}

</style>