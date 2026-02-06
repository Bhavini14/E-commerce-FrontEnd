<template>
  <div class="app-layout">
    <header class="navbar">
      <div class="logo">E-Commerce</div>

      <nav class="menu">
        <RouterLink to="/dashboard" active-class="active">Dashboard</RouterLink>
        <RouterLink to="/dashboard/Category" active-class="active">Category</RouterLink>

        <RouterLink to="/dashboard/AboutUs" active-class="active">About Us</RouterLink>
        <RouterLink to="/dashboard/ContactUs" active-class="active">Contact Us</RouterLink>
        <RouterLink to="/dashboard/Role" active-class="active">Role</RouterLink>
        <!-- <RouterLink to="/dashboard/Product" active-class="active">Product</RouterLink> -->
        <!-- <RouterLink to="/dashboard/AddProduct" active-class="active">Add Product</RouterLink> -->



        <div class="menu-item" @mouseenter="showProductMenu = true" @mouseleave="showProductMenu = false">
          <span class="menu-title">Product ▾</span>

          <div v-if="showProductMenu" class="submenu">
            <RouterLink to="/dashboard/AddProduct">Add Product</RouterLink>
            <RouterLink to="/dashboard/ViewProduct">View Product</RouterLink>
            <!-- <RouterLink to="/dashboard/EditProduct">Edit Product</RouterLink> -->
          </div>
        </div>
        <button class="logout-btn" @click="handleLogout">Logout</button>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { logout } from '../Services/auth.service';

const logoutmessage = ref("");
debugger
const handleLogout = async () => {
  const response = await logout();
  logoutmessage.value = response.data;
  localStorage.removeItem("token");
  router.push("/login");
  console.log(response);
};
const showProductMenu = ref(false);
</script>


<style scoped>
.app-layout {
  min-height: 100vh;
  background-color: #f5f6fa;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.navbar {
  height: 60px;
  background-color: #1e293b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.logo {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.menu {
  display: flex;
  gap: 20px;
  align-items: center;
}

.menu a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.menu a:hover {
  background-color: #334155;
  color: #fff;
}

.menu a.active {
  background-color: #2563eb;
  color: #fff;
}

.content {
  padding: 24px;
}



.menu-item {
  position: relative;
  cursor: pointer;
}

.menu-title {
  font-weight: 500;
}

.submenu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  padding: 8px 0;
  min-width: 150px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 100;
}

.submenu a {
  display: block;
  padding: 8px 12px;
  color: #333;
  text-decoration: none;
}

.submenu a:hover {
  background-color: #f5f5f5;
}
</style>
