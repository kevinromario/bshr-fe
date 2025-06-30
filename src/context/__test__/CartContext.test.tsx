import React from "react";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, CartContext, PAGE_SIZE } from "../CartContext";
import type { Cart } from "src/types/cart";

describe("CartProvider", () => {
  const mockCart: Cart = {
    id: 1,
    userId: 123,
    date: "2025-06-30",
    __v: 0,
    products: [
      {
        id: 101,
        title: "Product 1",
        price: 100,
        description: "Desc",
        category: "cat",
        image: "img.jpg",
        rating: {
          rate: 4.5,
          count: 20,
        },
        quantity: 2,
      },
    ],
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it("should provide default values", () => {
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper,
    });

    expect(result.current).not.toBeUndefined();
    expect(result.current?.originalCarts).toEqual([]);
    expect(result.current?.filteredCarts).toEqual([]);
    expect(result.current?.currentPage).toBe(1);
    expect(result.current?.totalPages).toBe(1);
    expect(result.current?.pageSize).toBe(PAGE_SIZE);
  });

  it("should update originalCarts and filteredCarts", () => {
    const { result } = renderHook(() => React.useContext(CartContext)!, {
      wrapper,
    });

    act(() => {
      result.current.setOriginalCarts([mockCart]);
      result.current.setFilteredCarts([mockCart]);
    });

    expect(result.current.originalCarts).toEqual([mockCart]);
    expect(result.current.filteredCarts).toEqual([mockCart]);
  });

  it("should update pagination values", () => {
    const { result } = renderHook(() => React.useContext(CartContext)!, {
      wrapper,
    });

    act(() => {
      result.current.setCurrentPage(3);
      result.current.setTotalPages(10);
    });

    expect(result.current.currentPage).toBe(3);
    expect(result.current.totalPages).toBe(10);
  });

  it("should clear all cart states using clearCarts", () => {
    const { result } = renderHook(() => React.useContext(CartContext)!, {
      wrapper,
    });

    act(() => {
      result.current.setOriginalCarts([mockCart]);
      result.current.setFilteredCarts([mockCart]);
      result.current.setCurrentPage(2);
      result.current.setTotalPages(5);
    });

    expect(result.current.originalCarts.length).toBe(1);
    expect(result.current.filteredCarts.length).toBe(1);
    expect(result.current.currentPage).toBe(2);
    expect(result.current.totalPages).toBe(5);

    act(() => {
      result.current.clearCarts();
    });

    expect(result.current.originalCarts).toEqual([]);
    expect(result.current.filteredCarts).toEqual([]);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(1);
  });
});
