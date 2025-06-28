"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { CenteredContainer } from "src/components/CenteredContainer";

export default function Home() {
  React.useEffect(() => {
    document.title = "Home - E-Commerce";
  }, []);
  return (
    <CenteredContainer>
      <Stack spacing={2}>
        <Typography variant="h6">E-Commerce</Typography>
        <Typography variant="subtitle1">
          Welcome to Simple E-Commerce
        </Typography>
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <Link href="/login">
            <Button variant="contained">Login</Button>
          </Link>
        </Box>
      </Stack>
    </CenteredContainer>
  );
}
