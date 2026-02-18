<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { AddProductRequest } from '../../Modal/AddProductRequest';
import { AddProducts } from '../../Services/product.service';
import { getCategories } from '../../Services/category.service';
import type { CategoryModal } from '../../Modal/CategoryModal';
import router from '../../router';
import ViewProduct from './ViewProduct.vue';

const product = ref<AddProductRequest>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: 0,
    image: null
});

const message = ref("");
const errorMessage = ref("");
const categories = ref<CategoryModal[]>([]);
const passvalue = ref("View Product data");

const SaveProduct = async () => {
    try {

        //Add Product
        await AddProducts(product.value);
        alert("Product saved successfully!");
        await router.push('/dashboard/ViewProduct');

        // Reset form
        product.value = {
            id: 0,
            name: "",
            description: "",
            price: 0,
            quantity: 0,
            categoryId: 0,
            image: null
        };
    } catch (error) {
        message.value = "Error saving product: " + error;
    }
}

const fetchCategories = async () => {
  try {
    const response = await getCategories()    
    categories.value = response.data.data
  } catch (error) {
    errorMessage.value = 'Failed to load categories'
  } 
}

const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        product.value.image = target.files?.[0] ?? null;
    }
    else {
        product.value.image = null;
    }

}
onMounted(fetchCategories);

</script>
<template>
    <div class="add-product">
        <h2>Add New Product</h2>
        <form @submit.prevent="SaveProduct">
            <div class="form-group">
                <label for="productName">Product Name</label>
                <input type="text" v-model="product.name" required />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea v-model="product.description" required></textarea>
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="number" v-model="product.price" required />
            </div>
            <div class="form-group  ">
                <label for="quantity">Quantity</label>
                <input type="number" v-model="product.quantity" required />
            </div>            
            <div class="form-group">
                <label for="categoryId">Category</label>
                <select v-model="product.categoryId" required>
                    <option value="" disabled>Select Category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>              
            </div>
            <div class="form-group">
                <label>Image</label>
                <input type="file" accept="image/*" @change="onFileChange" />
            </div>

            <button type="submit">Add Product</button>
        </form>

    </div>

    <ViewProduct
    :message= "passvalue"/>

</template>


<style scoped>
.add-product {
  max-width: 520px;
  margin: 40px auto;
  padding: 25px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.add-product h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 14px;
}

input,
select,
textarea {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #3b82f6;
}

textarea {
  resize: none;
  min-height: 80px;
}

button {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: none;
  border-radius: 8px;
  background: #3b82f6;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

button:hover {
  background: #2563eb;
}

button:active {
  transform: scale(0.98);
}

.message {
  margin-top: 12px;
  text-align: center;
  font-weight: 600;
}

</style>
