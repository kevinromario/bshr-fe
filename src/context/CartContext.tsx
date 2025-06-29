"use client";

import React, { createContext, useState, ReactNode, useMemo } from "react";
import { Cart } from "src/types/cart";

type CartContextType = {
  carts: Cart[];
  setCarts: (carts: Cart[]) => void;
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
  const [carts, setCarts] = useState<Cart[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const value = useMemo(
    () => ({
      carts,
      setCarts,
      currentPage,
      setCurrentPage,
      totalPages,
      setTotalPages,
      pageSize: PAGE_SIZE,
    }),
    [carts, currentPage, totalPages]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
