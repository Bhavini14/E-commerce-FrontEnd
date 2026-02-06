<template>
  <div class="form-wrapper">
    <form class="form-card" @submit.prevent="UpdateProduct">
      <h2>Edit Product</h2>

      <div class="form-group">
        <label>Description</label>
        <input
          type="text"
          v-model="form.description"
          placeholder="Enter product description"
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Price</label>
          <input
            type="number"
            v-model="form.price"
            placeholder="0.00"
          />
        </div>

        <div class="form-group">
          <label>Quantity</label>
          <input
            type="number"
            v-model="form.quantity"
            placeholder="0"
          />
        </div>
      </div>

      <div class="form-group">
        <label>Category</label>
        <select v-model="form.categoryId">
          <option disabled value="">Select category</option>
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.id"
          >
            {{ cat.name }}
          </option>
        </select>
      </div>

      <button class="btn-primary" type="submit">Update Product</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getProductById, updateProductdata } from '../../Services/product.service';
import { useRoute } from 'vue-router';
import type { CategoryModal } from '../../Modal/CategoryModal';
import { getCategories } from '../../Services/category.service';
import type { AddProductRequest } from '../../Modal/AddProductRequest';
import router from '../../router';

const route = useRoute();

const form = ref<AddProductRequest>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: 0,
    image: null 
});

const categories = ref<CategoryModal[]>([]);

const loadProduct = async () => {
    const id = Number(route.params.id); // for fetching Id from URL
    const response= await getProductById(id);
    const product = response.data.data;

    form.value.description = product.description;
    form.value.price = product.price;
    form.value.quantity = product.quantity;
    form.value.categoryId = product.categoryId;  
    form.value.name = product.name;
    form.value.id = product.id;  
}

const UpdateProduct = async () => {
   const id = Number(route.params.id);
   const response=updateProductdata(id,form.value);
   console.log(response);
   await router.push('/dashboard/ViewProduct');

}
                                                                                               
const fetchCategories = async () => {

  try {
    const response = await getCategories()    
    categories.value = response.data.data
  } catch (error) {    
  } 
}

onMounted(()=>{
  loadProduct();
  fetchCategories();
});

</script>

<style scoped>

  .form-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f6f9;
}

.form-card {
  background: #ffffff;
  width: 420px;
  padding: 24px 28px;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.form-card h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #555;
}

.form-group input,
.form-group select {
  padding: 10px 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.15);
}

.form-row {
  display: flex;
  gap: 12px;
}

.btn-primary {
  width: 100%;
  margin-top: 10px;
  padding: 12px;
  background: #4f46e5;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #4338ca;
}

</style>