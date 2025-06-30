"use client";
import { Box, Button, Stack } from "@mui/material";
import { CenteredContainer } from "src/components/CenteredContainer";
import { useAuth } from "src/hooks/useAuth";
import { useCart } from "src/hooks/useCart";
import { useProduct } from "src/hooks/useProduct";
import { useSnackbar } from "src/hooks/useSnackbar";
import { capitalizeFirstLetter } from "src/utils/string";
import { TableCart } from "./TableCart";

export default function Cart() {
  const { user, logout } = useAuth();
  const { showSnackbar } = useSnackbar();
  const { clearProducts } = useProduct();
  const { clearCarts } = useCart();

  const handleLogout = () => {
    logout();
    clearProducts();
    clearCarts();
    showSnackbar({
      message: `Goodbye ${capitalizeFirstLetter(user?.name.firstname || "")}`,
      severity: "success",
    });
  };

  return (
    <CenteredContainer maxWidth="lg" isCentered={false}>
      <Stack spacing={2}>
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
        <TableCart />
      </Stack>
    </CenteredContainer>
  );
}
