import {
  Box,
  Button,
  Dialog,
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
import CloseIcon from "@mui/icons-material/Close";
import { Cart as CartType } from "src/types/cart";
import { getCartTotalPrice, getCartTotalQuantity } from "src/utils/cartUtils";
import { formatCurrency } from "src/utils/currency";

type CartDetailProps = {
  cart: CartType;
};

export function CartDetail({ cart }: CartDetailProps) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Button sx={{ textTransform: "none" }} onClick={handleClickOpen}>
        Detail
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Cart Detail</DialogTitle>
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
              <Typography variant="subtitle2">Total Items:</Typography>{" "}
              {getCartTotalQuantity(cart)}
            </Box>
            <Box>
              <Typography variant="subtitle2">Total Price:</Typography>{" "}
              {formatCurrency(getCartTotalPrice(cart))}
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Qty</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.products.map((row) => {
                    return (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
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
                        <TableCell>{row.quantity}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
