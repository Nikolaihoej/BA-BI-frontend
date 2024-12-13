<template>
  <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';
import { defineProps } from 'vue';

const props = defineProps({
labels: Array,
data: Array
});

const chartCanvas = ref(null);
let chartInstance = null;

const createChart = () => {
const ctx = chartCanvas.value.getContext('2d');
chartInstance = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: props.labels,
    datasets: [{
      data: props.data,
      backgroundColor: props.colors,
      borderWidth: 1,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  }
});
};

const updateChart = () => {
  if (chartInstance) {
  chartInstance.data.labels = props.labels;
  chartInstance.data.datasets[0].data = props.data;
  chartInstance.data.datasets[0].backgroundColor = props.colors;
  chartInstance.update();
}
};

onMounted(() => {
createChart();
});

watch(() => props.labels, updateChart);
watch(() => props.data, updateChart);
watch(() => props.colors, updateChart);
</script>

<style>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>