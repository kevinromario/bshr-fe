import axios from "src/lib/axios";
import { Product } from "src/types/product";

export async function getAllProducts(): Promise<Product[]> {
  const res = await axios.get(`/products`);

  return res.data;
}
