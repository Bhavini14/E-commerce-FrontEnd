<template>
  <div class="app-layout">
    <header class="navbar">
      <div class="logo">E-Commerce</div>

      <nav class="menu">
        <RouterLink to="/dashboard" active-class="active">Dashboard</RouterLink>
        <RouterLink to="/dashboard/Category" active-class="active">Category</RouterLink>
        <RouterLink to="/dashboard/Product" active-class="active">Product</RouterLink>
        <RouterLink to="/dashboard/AboutUs" active-class="active">About Us</RouterLink>
        <RouterLink to="/dashboard/ContactUs" active-class="active">Contact Us</RouterLink>
        <RouterLink to="/dashboard/Role" active-class="active">Role</RouterLink>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

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
</style>
