<template>
  <div class="app-layout">    
    <main class="content">     
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
  
/* Layout */
.app-layout {
  min-height: 100vh;
  background-color: #f5f6fa;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Navbar */
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

/* Logo */
.logo {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Menu */
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

/* Active Route */
.menu a.active {
  background-color: #2563eb;
  color: #fff;
}

/* Main content */
.content {
  padding: 24px;
}
</style>

