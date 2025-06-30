import { Cart } from "src/types/cart";

export function getCartTotalPrice(cart?: Cart): number {
  if (!cart) return 0;
  return cart.products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
}

export function getCartTotalQuantity(cart?: Cart): number {
  if (!cart) return 0;
  return cart.products.reduce((total, product) => {
    return total + product.quantity;
  }, 0);
}
