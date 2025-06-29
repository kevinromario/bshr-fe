import axios from "src/lib/axios";
import { CartResponse } from "src/types/cart";

export async function getAllCarts(): Promise<CartResponse[]> {
  const res = await axios.get(`/carts`);

  return res.data;
}
