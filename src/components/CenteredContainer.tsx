import { Box, Container, ContainerProps } from "@mui/material";
import { ReactNode } from "react";

type CenteredContainerProps = {
  children: ReactNode;
  maxWidth?: ContainerProps["maxWidth"];
  isCentered?: boolean;
};

export function CenteredContainer({
  children,
  maxWidth = "xs",
  isCentered = true,
}: CenteredContainerProps) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        justifyItems: "center",
        alignContent: isCentered ? "center" : null,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "7px",
          paddingY: "10px",
          marginTop: isCentered ? null : "10px",
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
