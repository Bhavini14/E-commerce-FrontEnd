export interface AddProductRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  image: File | null;
}