"use client";
import "src/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthProvider, CartProvider, SnackbarProvider } from "src/context";
import { AuthGuardWrapper } from "src/components/AuthGuardWrapper";
import { ProductProvider } from "src/context/ProductContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <ProductProvider>
              <AuthGuardWrapper>
                <SnackbarProvider>{children}</SnackbarProvider>
              </AuthGuardWrapper>
            </ProductProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
