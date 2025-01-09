<template>
  <div class="container d-flex justify-content-center">
    <div class="loginContainer">
      <h1 class="text-center p-4">Login</h1>
      <form class="w-100" style="max-width: 240px;" @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" v-model="email" placeholder="name@example.com">
        </div>
        <div class="mb-3 position-relative">
          <label for="password" class="form-label">Password</label>
          <div class="d-flex align-items-center">
            <input :type="passwordFieldType" class="form-control" id="password" v-model="password" placeholder="Password">
            <i :class="toggleIconClass" @click="togglePassword" class="position-absolute" style="right: 10px; cursor: pointer; color: grey;"></i>
          </div>
        </div>
        <div class="d-flex justify-content-center pt-4">
          <button class="btn bluebtn" type="submit">LOG IN</button>
        </div>
        <div>
          <p class="text-center pt-4">Don't have an account? <router-link to="/register" class="bluetext">Sign up</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useApiStore } from '../stores/useApiStore';

  const email = ref('');
  const password = ref('');
  const passwordFieldType = ref('password');
  const toggleIconClass = ref('bi bi-eye-fill');
  const router = useRouter();
  const apiStore = useApiStore();
  
  const togglePassword = () => {
    if (passwordFieldType.value === 'password') {
      passwordFieldType.value = 'text';
      toggleIconClass.value = 'bi bi-eye-slash-fill';
    } else {
      passwordFieldType.value = 'password';
      toggleIconClass.value = 'bi bi-eye-fill';
    }
  };

  const login = async () => {
    try {
      await apiStore.login(email.value, password.value);
      router.push('/oversigt');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

</script>
    
<style scoped>
  .loginContainer {
      margin-top: 300px;
      background-color: #1C4C74;
      padding: 28px;
      border-radius: 8px;
      color: white;
  }

  .bluetext {
      color: #6CB4E4 !important;
      text-decoration: none;
  }

  .bluebtn, .bluebtn:hover {
      background-color: #6CB4E4;
  }

  .position-relative {
  position: relative;
  }

  .position-absolute {
  position: absolute;
  top: 55%;
  }
</style>