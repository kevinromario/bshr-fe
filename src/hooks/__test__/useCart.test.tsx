import { renderHook, act } from "@testing-library/react";
import { useCart } from "../useCart"; // sesuaikan path
import { CartContext } from "src/context";
import React from "react";

describe("useCart", () => {
  it("should throw error when used outside CartProvider", () => {
    expect(() => renderHook(() => useCart())).toThrow(
      "useCart must be used within a CartProvider"
    );
  });

  it("should provide cart context when used inside CartProvider", () => {
    const mockSetOriginalCarts = jest.fn();
    const mockSetFilteredCarts = jest.fn();
    const mockClearCarts = jest.fn();
    const mockSetCurrentPage = jest.fn();
    const mockSetTotalPages = jest.fn();

    const mockValue = {
      originalCarts: [
        {
          id: 1,
          userId: 42,
          date: "2025-06-30",
          __v: 0,
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
              quantity: 1,
            },
          ],
        },
      ],
      filteredCarts: [],
      setOriginalCarts: mockSetOriginalCarts,
      setFilteredCarts: mockSetFilteredCarts,
      clearCarts: mockClearCarts,
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
      totalPages: 5,
      setTotalPages: mockSetTotalPages,
      pageSize: 10,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartContext.Provider value={mockValue}>{children}</CartContext.Provider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.originalCarts).toEqual(mockValue.originalCarts);
    expect(result.current.filteredCarts).toEqual([]);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(5);

    act(() => {
      result.current.setOriginalCarts([]);
      result.current.setFilteredCarts([]);
      result.current.clearCarts();
      result.current.setCurrentPage(2);
      result.current.setTotalPages(10);
    });

    expect(mockSetOriginalCarts).toHaveBeenCalledWith([]);
    expect(mockSetFilteredCarts).toHaveBeenCalledWith([]);
    expect(mockClearCarts).toHaveBeenCalled();
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
    expect(mockSetTotalPages).toHaveBeenCalledWith(10);
  });
});
