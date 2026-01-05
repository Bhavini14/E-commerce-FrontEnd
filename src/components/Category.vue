<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCategories } from '../Services/category.service'


interface Category {
  id: number
  name: string
}

const categories = ref<Category[]>([])
const loading = ref(false)
const errorMessage = ref('')

const fetchCategories = async () => {
  loading.value = true
  try {
    const response = await getCategories()    
    categories.value = response.data.data
  } catch (error) {
    errorMessage.value = 'Failed to load categories'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <div class="category-wrapper">
    <div class="category-card">
      <h2 class="title">Categories</h2>

      <!-- Loading -->
      <p v-if="loading" class="loading">Loading categories...</p>

      <!-- Error -->
      <p v-if="errorMessage" class="error">
        {{ errorMessage }}
      </p>

      <!-- List -->
      <ul v-if="!loading && categories.length" class="category-list">
        <li v-for="category in categories" :key="category.id" class="category-item">
          {{ category.name }}
        </li>
      </ul>

      <!-- Empty state -->
      <p v-if="!loading && !categories.length" class="empty">
        No categories found
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Center wrapper */
.category-wrapper {
  display: flex;
  justify-content: center;
  padding-top: 40px;
}

/* Card */
.category-card {
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* Title */
.title {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
}

/* States */
.loading {
  color: #475569;
}

.error {
  color: #dc2626;
  margin-bottom: 12px;
}

.empty {
  color: #64748b;
  text-align: center;
}

/* List */
.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  padding: 12px 14px;
  border-radius: 8px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  margin-bottom: 10px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.category-item:hover {
  background-color: #e0f2fe;
  border-color: #38bdf8;
}
</style>
