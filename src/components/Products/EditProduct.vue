<template>
  <div class="form-container">
    <h2>Edit Product</h2>

    <input type="text" v-model="form.description" placeholder="Description" />
    <input type="number" v-model="form.price" placeholder="Price" />    
    <input type="number" v-model="form.quantity" placeholder="Quantity" />
   <select v-model="form.categoryId">
      <option v-for="cat in categories" :key="cat.id" :value="cat.id">
        {{ cat.name }}
      </option>
    </select>
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getProductById } from '../../Services/product.service';
import { useRoute } from 'vue-router';
import type { CategoryModal } from '../../Modal/CategoryModal';
import { getCategories } from '../../Services/category.service';

const route = useRoute();

const form = ref({
  description: "",
  price: 0,
  quantity: 0,
  categoryId: 0,
  image: null as File | null
});

const categories = ref<CategoryModal[]>([]);

const loadProduct = async () => {
    debugger
    const id = Number(route.params.id); // for fetching Id from URL
    const data= await getProductById(id);

    form.value.description = data.data.description;
    form.value.price = data.data.price;
    form.value.quantity = data.data.quantity;
    form.value.categoryId = data.data.categoryId;    
    console.log(data.data);
}


const fetchCategories = async () => {
    debugger
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
</style>