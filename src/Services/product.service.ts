
import type { AddProductRequest } from "../Modal/AddProductRequest";
import api from "./api";

export const AddProducts = (payload: AddProductRequest) => {
  debugger
    const formData = new FormData();
    formData.append("name", payload.name);  
    formData.append("description", payload.description);
    formData.append("price", payload.price.toString());
    formData.append("quantity", payload.quantity.toString());
    formData.append("categoryId", payload.categoryId.toString());
    if (payload.image) {
        formData.append("image", payload.image);
    }
  return api.post("/Product",formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const getProducts = () => {
  return api.get("/Product");
};

export const getProductById = (id: number) => {
  return api.get(`/Product/${id}`);
}