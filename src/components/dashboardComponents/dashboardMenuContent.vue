<template>
  <div class="d-flex row justify-content-center">
    <div class="d-flex justify-content-center mt-5">
      <input type="file" id="csvFile" accept=".csv" @change="handleFileChange" style="display: none;" ref="fileInput">
      <button class="btn import-btn btn-primary d-flex" @click="triggerFileInput">Importer data</button>
    </div>
  </div>
  <div>
    <dropdownComponent class="mt-5" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useApiStore } from '../../stores/useApiStore';
import dropdownComponent from './dropdownComponent.vue';

const fileInput = ref(null);
const apiStore = useApiStore();

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = async (event) => {
  const file = event.target.files[0];

  if (!file) {
    alert("Please select a CSV file first.");
    return;
  }

  try {
    const data = await apiStore.uploadCSV(file);
    console.log('Success:', data);
    alert('File uploaded successfully');
  } catch (error) {
    console.error('Error:', error);
    prompt('File upload failed. Copy the error message:', error.message || error);
  }
};
</script>

<style scoped>

.import-btn {
  background-color: #6cb4e4 !important;
  border-color: #6cb4e4 !important;
}

.file-btn {
  background-color: white !important;
  border-color: white !important;
  width: 100%;
}

.file-btn:hover, .file-btn:focus, .file-btn:active {
  color: black !important;
  background-color: white !important;
  border-color: white !important;
}

.dropdown-menu.show {
    width: 88%;
}

.file-dropdown {
    padding-left: 20px !important;
    padding-right: 20px !important;
}

</style>
