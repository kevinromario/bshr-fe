"use client";

import React, { createContext, useState, ReactNode, useMemo } from "react";
import { Cart } from "src/types/cart";

type CartContextType = {
  originalCarts: Cart[];
  filteredCarts: Cart[];
  setOriginalCarts: (carts: Cart[]) => void;
  setFilteredCarts: (carts: Cart[]) => void;
  clearCarts: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (total: number) => void;
  pageSize: number;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const PAGE_SIZE = 5;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [originalCarts, setOriginalCarts] = useState<Cart[]>([]);
  const [filteredCarts, setFilteredCarts] = useState<Cart[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const clearCarts = () => {
    setOriginalCarts([]);
    setFilteredCarts([]);
    setCurrentPage(1);
    setTotalPages(1);
  };

  const value = useMemo(
    () => ({
      originalCarts,
      filteredCarts,
      setOriginalCarts,
      setFilteredCarts,
      clearCarts,
      currentPage,
      setCurrentPage,
      totalPages,
      setTotalPages,
      pageSize: PAGE_SIZE,
    }),
    [originalCarts, filteredCarts, currentPage, totalPages]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
