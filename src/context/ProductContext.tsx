"use client";

import React, { createContext, useState, useMemo } from "react";
import type { Product } from "src/types/product";

type ProductContextType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  clearProducts: () => void;
};

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const clearProducts = () => setProducts([]);

  const value = useMemo(
    () => ({
      products,
      setProducts,
      clearProducts,
    }),
    [products]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
