import React from "react";
import { renderHook, act } from "@testing-library/react";
import { ProductProvider, ProductContext } from "../ProductContext";
import type { Product } from "src/types/product";

describe("ProductProvider", () => {
  const mockProduct: Product = {
    id: 1,
    title: "Test Product",
    price: 100,
    description: "A great product",
    category: "test",
    image: "image.jpg",
    rating: {
      rate: 4.5,
      count: 10,
    },
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ProductProvider>{children}</ProductProvider>
  );

  it("should provide default value (empty product list)", () => {
    const { result } = renderHook(() => React.useContext(ProductContext), {
      wrapper,
    });

    expect(result.current).not.toBeUndefined();
    expect(result.current?.products).toEqual([]);
  });

  it("should update products using setProducts", () => {
    const { result } = renderHook(() => React.useContext(ProductContext)!, {
      wrapper,
    });

    act(() => {
      result.current.setProducts([mockProduct]);
    });

    expect(result.current.products).toEqual([mockProduct]);
  });

  it("should clear products using clearProducts", () => {
    const { result } = renderHook(() => React.useContext(ProductContext)!, {
      wrapper,
    });

    act(() => {
      result.current.setProducts([mockProduct]);
    });

    expect(result.current.products.length).toBe(1);

    act(() => {
      result.current.clearProducts();
    });

    expect(result.current.products).toEqual([]);
  });
});
