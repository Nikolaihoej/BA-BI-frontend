<template>
    <div class="menu-box d-flex flex-column">
        <div class="menu-content">
            <div v-if="page === 'oversigt'">
                <overviewMenuContent />
            </div>
            <div v-if="page === 'dashboard'">
                <dashboardMenuContent />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import overviewMenuContent from './overviewComponents/overviewMenuContent.vue';
import dashboardMenuContent from './dashboardComponents/dashboardMenuContent.vue';

const props = defineProps({
  page: {
    type: String,
    required: true
  }
});
</script>

<style>
.menu-box {
    background-color: #1C4C74;
    min-width: 300px;
    height: 100vh;
    color: white;
    display: flex;
    flex-direction: column;
}
</style>
