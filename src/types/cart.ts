import { Product } from "./product";

export type ProductCartResponse = {
  productId: number;
  quantity: number;
};

export type CartResponse = {
  id: number;
  userId: number;
  date: string;
  products: ProductCartResponse[];
  __v: number;
};

export type ProductWithQuantity = Product & {
  quantity: number;
};

export type Cart = {
  id: number;
  userId: number;
  date: string;
  products: ProductWithQuantity[];
  __v: number;
};
