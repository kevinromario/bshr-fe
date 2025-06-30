import { renderHook } from "@testing-library/react";
import { useProduct } from "../useProduct";
import { ProductContext } from "src/context/ProductContext";
import React from "react";

describe("useProduct", () => {
  it("should throw error when used outside ProductProvider", () => {
    expect(() => renderHook(() => useProduct())).toThrow(
      "useProduct must be used within a ProductProvider"
    );
  });

  it("should return context value when used inside ProductProvider", () => {
    const mockContextValue = {
      products: [
        {
          id: 1,
          title: "Mock Product",
          price: 100000,
          description: "Desc",
          category: "Test",
          image: "img.jpg",
          rating: {
            rate: 4.5,
            count: 100,
          },
        },
      ],
      setProducts: () => null,
      clearProducts: () => null,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProductContext.Provider value={mockContextValue}>
        {children}
      </ProductContext.Provider>
    );

    const { result } = renderHook(() => useProduct(), { wrapper });

    expect(result.current).toBe(mockContextValue);
  });
});
