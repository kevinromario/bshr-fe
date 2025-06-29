"use client";
import { Box, Button } from "@mui/material";
import { CenteredContainer } from "src/components/CenteredContainer";
import { useAuth } from "src/hooks/useAuth";
import { useSnackbar } from "src/hooks/useSnackbar";
import { capitalizeFirstLetter } from "src/utils/string";

export default function Cart() {
  const { user, logout } = useAuth();
  const { showSnackbar } = useSnackbar();
  const handleLogout = () => {
    logout();
    showSnackbar({
      message: `Goodbye ${capitalizeFirstLetter(user?.name.firstname || "")}`,
      severity: "success",
    });
  };
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
    </CenteredContainer>
  );
}
