<template>
    <div class="product-page">
        <h2>Products</h2>

        <div v-if="loading">Loading products...</div>

        <div v-else class="product-grid">
            <div class="product-card" v-for="product in products" :key="product.id">
                <img :src="product.imageUrl" alt="product image" class="product-image" />

                <h3>{{ product.description }}</h3>

                <p><b>Product Name:</b> ₹{{ product.Name }}</p>
                <p><b>Price:</b> ₹{{ product.price }}</p>
                <p><b>Quantity:</b> {{ product.quantity }}</p>
                <p><b>Category:</b> {{ product.categoryName }}</p>

                <button @click="editProduct(product.id)">Edit</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { useRouter } from "vue-router";
import { getProducts } from "../../Services/product.service";

const router = useRouter();
const products = ref<any[]>([]);
const loading = ref(false);

const fetchProducts = async () => {
    loading.value = true;
    try {
        const res = await getProducts();
        products.value = res.data.data;
    } catch (error) {
        console.error("Failed to load products", error);
    } finally {
        loading.value = false;
    }
};

const editProduct = (id: number) => {
    router.push(`/dashboard/EditProduct/${id}`);
};

onMounted(fetchProducts);
</script>

<style scoped>
.product-page {
    padding: 20px;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
}

.product-card {
    border: 1px solid #ddd;
    padding: 12px;
    border-radius: 8px;
}

.product-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 6px;
}
</style>
