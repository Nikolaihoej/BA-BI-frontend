<template>
  <div class="d-flex row justify-content-center">
    <div class="d-flex justify-content-center mt-5">
      <button class="btn import-btn btn-primary d-flex">Importer data</button>
    </div>
  </div>
  <div>
    <dropdownComponent class="mt-5" />
  </div>
</template>

<script setup>
import dropdownComponent from './dropdownComponent.vue';
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
