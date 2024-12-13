<template>
  <div class="user-initial" @click="toggleDropdown">
    <div class="dropdown userSettings d-flex justify-content-center align-items-center">J</div>
    <ul v-if="dropdownVisible" class="dropdown-menu">
        <li class="account-info">
          <h4>Account</h4>
          <div>Hey! {{ userName }}</div>
          <div>{{ userEmail }}</div>
        </li>
        <li>
            <div class="logout-container d-flex justify-content-start p-2 align-items-center">
                <a class="dropdown-logout fs-6" @click="logout">Log ud</a>
                <div><i class="logout-icon bi bi-box-arrow-right fs-4 ms-2"></i></div>
            </div>
        </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const dropdownVisible = ref(false);
const router = useRouter();

const userName = ref("John Doe");
const userEmail = ref("john.doe@example.com");

function toggleDropdown() {
  dropdownVisible.value = !dropdownVisible.value;
}

function logout() {
  router.push('/login');
}
</script>

<style scoped>
.user-initial {
  position: relative;
  top: calc(50% - 20px);
  font-weight: bold;
  color: white;
  font-size: 25px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  display: block;
  color: white;
  background-color: #1C4C74;
  border-radius: 6px;
  padding: 10px;
  list-style: none;
}

.account-info {
  padding: 10px;
  border-bottom: 2px solid #ccc;
}

.userSettings {
  background-color: #1c4c74;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.dropdown-logout {
    color: white; 
    text-decoration: none;
    cursor: pointer;
}

.logout-icon {
    color: white;
    cursor: pointer;
}

</style>
