import { Box, Typography } from "@mui/material";
import { ProductWithQuantity } from "src/types/cart";

type CartImagePreviewProps = {
  products: ProductWithQuantity[];
};

export function CartImagePreview({ products }: CartImagePreviewProps) {
  const firstImage = products[0]?.image;
  const secondImage = products[1]?.image;
  const remaining = products.length - 2;

  return (
    <Box display="flex" gap={1}>
      {firstImage && (
        <Box
          component="img"
          src={firstImage}
          alt="product 1"
          sx={{
            width: 50,
            height: 50,
            borderRadius: 1,
            objectFit: "cover",
          }}
        />
      )}

      {secondImage && (
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: 1,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={secondImage}
            alt="product 2"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: remaining > 0 ? "brightness(50%)" : "none",
            }}
          />
          {remaining > 0 && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                +{remaining}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
