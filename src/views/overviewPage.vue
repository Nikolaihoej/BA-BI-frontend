<template>
    <navBar />
    <div class="d-flex content">
        <sideMenu :page="currentPage"/>
        <userDashboards />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import navBar from '../components/navBar.vue';
import sideMenu from '../components/sideMenu.vue';
import userDashboards from '../components/userDashboards.vue';


const currentPage = ref('oversigt');
</script>
<style>
</style>