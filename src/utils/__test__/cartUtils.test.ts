import { getCartTotalPrice, getCartTotalQuantity } from "../cartUtils";
import { Cart } from "src/types/cart";

const mockCart: Cart = {
  id: 1,
  userId: 42,
  date: "2025-06-30",
  __v: 0,
  products: [
    {
      id: 101,
      title: "Laptop",
      price: 15000000,
      description: "High performance laptop",
      category: "electronics",
      image: "https://example.com/laptop.jpg",
      rating: {
        rate: 4.5,
        count: 100,
      },
      quantity: 1,
    },
    {
      id: 102,
      title: "Headphones",
      price: 250000,
      description: "Noise-cancelling headphones",
      category: "electronics",
      image: "https://example.com/headphones.jpg",
      rating: {
        rate: 4.8,
        count: 200,
      },
      quantity: 2,
    },
  ],
};

describe("getCartTotalPrice", () => {
  it("should return correct total price", () => {
    const result = getCartTotalPrice(mockCart);
    expect(result).toBe(15000000 * 1 + 250000 * 2);
  });

  it("should return 0 for undefined cart", () => {
    expect(getCartTotalPrice(undefined)).toBe(0);
  });

  it("should return 0 for cart with no products", () => {
    const emptyCart: Cart = { ...mockCart, products: [] };
    expect(getCartTotalPrice(emptyCart)).toBe(0);
  });
});

describe("getCartTotalQuantity", () => {
  it("should return correct total quantity", () => {
    const result = getCartTotalQuantity(mockCart);
    expect(result).toBe(3);
  });

  it("should return 0 for undefined cart", () => {
    expect(getCartTotalQuantity(undefined)).toBe(0);
  });

  it("should return 0 for cart with no products", () => {
    const emptyCart: Cart = { ...mockCart, products: [] };
    expect(getCartTotalQuantity(emptyCart)).toBe(0);
  });
});
