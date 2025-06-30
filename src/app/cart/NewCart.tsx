import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useProduct } from "src/hooks/useProduct";
import { getCartTotalPrice, getCartTotalQuantity } from "src/utils/cartUtils";
import { formatCurrency } from "src/utils/currency";
import CloseIcon from "@mui/icons-material/Close";
import { Cart as CartType } from "src/types/cart";
import { useCart } from "src/hooks/useCart";
import { useAuth } from "src/hooks/useAuth";

export function NewCart({ onSuccess }: { onSuccess: () => void }) {
  const { products } = useProduct();
  const { originalCarts, setOriginalCarts } = useCart();
  const { user } = useAuth();

  const initCart = {
    id: originalCarts.length + 1,
    userId: user?.id || 0,
    date: new Date().toISOString(),
    products: [],
    __v: 0,
  };

  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartType>({ ...initCart });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleReset();
  };

  const handleReset = () => {
    setCart({
      ...initCart,
    });
  };

  const handleToggleProduct = (productId: number, isChecked: boolean) => {
    setCart((prevCart) => {
      const existing = prevCart.products.find((p) => p.id === productId);

      if (isChecked && !existing) {
        const product = products.find((p) => p.id === productId);
        if (!product) return prevCart;

        return {
          ...prevCart,
          products: [...prevCart.products, { ...product, quantity: 1 }],
        };
      }

      if (!isChecked && existing) {
        return {
          ...prevCart,
          products: prevCart.products.filter((p) => p.id !== productId),
        };
      }

      return prevCart;
    });
  };

  const handleCreateCart = () => {
    const newCart = cart;
    cart.id = originalCarts.length + 1;
    setOriginalCarts((prev) => [newCart, ...prev]);
    onSuccess();
    handleClose();
  };

  return (
    <Box>
      <Button onClick={handleClickOpen}>New Cart</Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>New Cart</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2">Select Product:</Typography>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((row) => {
                    return (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          <Checkbox
                            checked={cart.products.some((p) => p.id === row.id)}
                            onChange={(e) =>
                              handleToggleProduct(row.id, e.target.checked)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Box
                            component="img"
                            src={row.image}
                            alt={row.title}
                            sx={{
                              width: 50,
                              height: 50,
                              borderRadius: 1,
                              objectFit: "cover",
                            }}
                          />
                        </TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{formatCurrency(row.price)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box display="flex" gap={2}>
              <Typography variant="subtitle2">Total Items:</Typography>{" "}
              {getCartTotalQuantity(cart)}
              <Typography variant="subtitle2">Total Price:</Typography>{" "}
              {formatCurrency(getCartTotalPrice(cart))}
            </Box>
            <Box>
              <Button onClick={handleReset}>Reset</Button>
              <Button onClick={handleCreateCart}>Create Cart</Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
