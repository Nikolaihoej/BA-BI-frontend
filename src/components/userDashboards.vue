<template>
    <div class="dashboard-overview">
        <div class="container-fluid">
            <div class="dashboard-title">
                <h1>Dashboard oversigt</h1> 
            </div>
            <div class="solid-breaker"></div>
            <div class="personal-dashboard-title">
                <h3>Personal Dashboard</h3>
            </div>
            <div class="overview-content d-flex">
                <dashboardCard />
                <createDashboard/>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import dashboardCard from '../components/dashboardComponents/dashboardCard.vue';
import createDashboard from '../components/dashboardComponents/createDashboard.vue';

</script>

<style>
.dashboard-overview {
    display: flex;
    width: 100%;
    height: fill;
    background-color: white;
}

.dashboard-title {
    color: black;
    padding-top: 14px;
    font-weight: bold;
}
.personal-dashboard-title{
    color: black;
    padding-top: 28px;
    font-weight: bold;
}

.solid-breaker {
    width: 100%;
    height: 3px;
    background-color: black;
}

</style>
