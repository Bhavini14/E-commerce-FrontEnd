<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { login } from '../Services/auth.service';
import { useRouter } from 'vue-router';
import { useUserStore } from '../Stores/userStore';

const userName = ref("");
const password = ref("");
const loading = ref(false);
const router = useRouter();
const errorMessage = ref("");
const userStore = useUserStore();
const userNameError = ref("");
const passwordError = ref("");

const validationForm = () => {
  let isValid = true;
  userNameError.value = "";
  passwordError.value = "";

  if (!userName.value) {
    userNameError.value = "Username is required";
    isValid = false;
  }

  if (!password.value) {
    passwordError.value = "Password is required";
    isValid = false;
  }

  return isValid;
}

const handleLogin = async () => {
  if (!validationForm()) {
    return;
  }
  loading.value = true;
  try {
    const response = await login({
      userName: userName.value,
      password: password.value
    });
    userStore.setUsername(userName.value);
    localStorage.setItem("token", response.data.token);
    const refreshtoken = response.data.refreshToken;
    localStorage.setItem("refreshToken", refreshtoken);
    await router.push('/dashboard');
  } catch (error: any) {
    if (error.response?.data === 'invalidusername') {
      errorMessage.value = 'Invalid username or password';
    } else {
      errorMessage.value = 'Something went wrong. Please try again.';
    }
  } finally {
    loading.value = false;
  }
}

//======================= insted of @input="userNameError = ''" (Second Way) ========================
// watch(userName, () => {  
//   userNameError.value = "";  
// });
// watch(password, () => {  
//   passwordError.value = "";  
// });

const users = ref([
  "Bhavini",
  "Prajapati"
])

const search = ref("");

const filteredUsers = computed(() => {
  return users.value.filter(user => user.toLowerCase().includes(search.value.toLowerCase()));
})

</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h2 class="title">Welcome Back</h2>
      <p class="subtitle">Please login to your account</p>

      <div class="form-group">
        <label>Username</label>
        <input v-model="userName" type="text" placeholder="Enter username"  @input="userNameError = ''" />
        <p v-if="userNameError" class="error">{{ userNameError }}</p>
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="Enter password" @input="passwordError = ''" />
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
      </div>

      <button class="login-btn" @click="handleLogin" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
      </button>

      <p v-if="errorMessage" class="error">
        {{ errorMessage }}
      </p>
    </div>
  </div>
  <li v-for="user in filteredUsers" :key="user">
    {{ user }}
  </li>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
}

/* Card */
.login-card {
  width: 360px;
  background: #ffffff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Title */
.title {
  margin-bottom: 6px;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
}

.subtitle {
  margin-bottom: 24px;
  font-size: 14px;
  color: #64748b;
  text-align: center;
}

/* Form */
.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  color: #334155;
}

input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #2563eb;
}

/* Button */
.login-btn {
  width: 100%;
  margin-top: 8px;
  padding: 10px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.3s;
}

.login-btn:hover:not(:disabled) {
  background-color: #1e40af;
}

.login-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

/* Error */
.error {
  margin-top: 14px;
  /* text-align: center; */
  color: #dc2626;
  font-size: 13px;
}
</style>