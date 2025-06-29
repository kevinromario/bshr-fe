"use client";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { CenteredContainer } from "src/components/CenteredContainer";
import { PAGE_SIZE } from "src/context";
import { useAuth } from "src/hooks/useAuth";
import { useCart } from "src/hooks/useCart";
import { useProduct } from "src/hooks/useProduct";
import { useSnackbar } from "src/hooks/useSnackbar";
import { getAllCarts } from "src/services/cart.service";
import { getAllProducts } from "src/services/product.service";
import {
  Cart as CartType,
  ProductCartResponse,
  ProductWithQuantity,
} from "src/types/cart";
import { handleAxiosError } from "src/utils/handleAxiosError";
import { capitalizeFirstLetter } from "src/utils/string";

export default function Cart() {
  const { user, logout } = useAuth();
  const { showSnackbar } = useSnackbar();
  const { setProducts, clearProducts, products } = useProduct();
  const { setCarts, setTotalPages, currentPage, pageSize, carts, clearCarts } =
    useCart();

  const handleLogout = () => {
    logout();
    clearProducts();
    clearCarts();
    showSnackbar({
      message: `Goodbye ${capitalizeFirstLetter(user?.name.firstname || "")}`,
      severity: "success",
    });
  };

  useEffect(() => {
    const fetchCartAndProducts = async () => {
      try {
        const [carts, products] = await Promise.all([
          getAllCarts(),
          getAllProducts(),
        ]);

        setProducts(products);

        const cartsWithProductDetail: CartType[] = carts.map((cart) => {
          const productsWithQuantity = cart.products
            .map((item: ProductCartResponse) => {
              const productDetail = products.find(
                (p) => p.id === item.productId
              );
              if (!productDetail) return null;
              return {
                ...productDetail,
                quantity: item.quantity,
              };
            })
            .filter((p): p is ProductWithQuantity => p !== null);

          return {
            ...cart,
            products: productsWithQuantity,
          };
        });

        setCarts(cartsWithProductDetail);
        setTotalPages(Math.ceil(cartsWithProductDetail.length / PAGE_SIZE));
      } catch (error) {
        const message = handleAxiosError(error);
        showSnackbar({
          message: message,
          severity: "error",
        });
      }
    };

    fetchCartAndProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paginatedCarts = carts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <CenteredContainer maxWidth="lg" isCentered={false}>
      <Box
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box>
          Hi {capitalizeFirstLetter(user?.name.firstname || "")}, here is your
          cart.
        </Box>
        <Box>
          <Button onClick={handleLogout} color="error">
            Log Out
          </Button>
        </Box>
      </Box>
      <ul>
        {paginatedCarts.map((cart) => (
          <li key={cart.id}>Cart ID: {cart.id}</li>
        ))}
      </ul>
      <ol>
        {products.map((product) => (
          <li key={product.id}>product name: {product.title}</li>
        ))}
      </ol>
    </CenteredContainer>
  );
}
