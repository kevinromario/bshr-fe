"use client";
import "src/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthProvider, SnackbarProvider } from "src/context";
import { AuthGuardWrapper } from "src/components/AuthGuardWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthGuardWrapper>
            <SnackbarProvider>{children}</SnackbarProvider>
          </AuthGuardWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
