import {
  Box,
  Button,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CartImagePreview } from "src/components/CartProductImagePreview";
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
import { getCartTotalPrice, getCartTotalQuantity } from "src/utils/cartUtils";
import { formatCurrency } from "src/utils/currency";
import { handleAxiosError } from "src/utils/handleAxiosError";
import { CartDetail } from "./CartDetail";
import { NewCart } from "./NewCart";
import { formatDateOnly } from "src/utils/string";

export function TableCart() {
  const [findProduct, setFindProduct] = useState("");
  const { showSnackbar } = useSnackbar();
  const { setProducts } = useProduct();
  const {
    originalCarts,
    setOriginalCarts,
    filteredCarts,
    setFilteredCarts,
    setCurrentPage,
    pageSize,
    totalPages,
    setTotalPages,
    currentPage,
  } = useCart();

  const renderProducts = (cart: CartType) => {
    return (
      <Stack direction="row" spacing={2}>
        {CartImagePreview(cart)}
      </Stack>
    );
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    if (!findProduct) {
      handleReset();
      return;
    }

    const filtered = originalCarts.filter((cart) =>
      cart.products.some((product) =>
        product.title.toLowerCase().includes(findProduct.toLowerCase())
      )
    );

    setFilteredCarts(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / pageSize));
  };

  const handleReset = () => {
    setFilteredCarts(originalCarts);
    setCurrentPage(1);
    setTotalPages(Math.ceil(originalCarts.length / pageSize));
    setFindProduct("");
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

        setOriginalCarts(cartsWithProductDetail);
        setFilteredCarts(cartsWithProductDetail);
        setTotalPages(Math.ceil(cartsWithProductDetail.length / pageSize));
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

  useEffect(() => {
    setFilteredCarts(originalCarts);
    setCurrentPage(1);
    setTotalPages(Math.ceil(originalCarts.length / pageSize));
    setFindProduct("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalCarts]);

  const paginatedCarts = filteredCarts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={2}>
          <TextField
            value={findProduct}
            label="Find Product"
            variant="outlined"
            size="small"
            onChange={(event) => setFindProduct(event.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
          <Button color="error" onClick={handleReset}>
            Reset
          </Button>
        </Box>
        <NewCart
          onSuccess={() =>
            showSnackbar({
              message: "New cart added successfully.",
              severity: "success",
            })
          }
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Items</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCarts.map((row, index) => {
              const totalPrice = getCartTotalPrice(row);
              const totalItems = getCartTotalQuantity(row);

              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{formatDateOnly(row.date)}</TableCell>
                  <TableCell>{totalItems}</TableCell>
                  <TableCell>{formatCurrency(totalPrice)}</TableCell>
                  <TableCell>{renderProducts(row)}</TableCell>
                  <TableCell>
                    <CartDetail cart={row} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        shape="rounded"
        showFirstButton
        showLastButton
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: "flex", justifyContent: "flex-end" }}
      />
    </>
  );
}
