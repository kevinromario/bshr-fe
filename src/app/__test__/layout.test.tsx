/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import RootLayout from "../layout";

jest.mock("src/context", () => ({
  AuthProvider: ({ children }: any) => <div data-testid="auth">{children}</div>,
  CartProvider: ({ children }: any) => <div data-testid="cart">{children}</div>,
  SnackbarProvider: ({ children }: any) => (
    <div data-testid="snackbar">{children}</div>
  ),
}));

jest.mock("src/context/ProductContext", () => ({
  ProductProvider: ({ children }: any) => (
    <div data-testid="product">{children}</div>
  ),
}));

jest.mock("src/components/AuthGuardWrapper", () => ({
  AuthGuardWrapper: ({ children }: any) => (
    <div data-testid="auth-guard">{children}</div>
  ),
}));

describe("RootLayout", () => {
  it("renders all context providers and children correctly", () => {
    render(
      <RootLayout>
        <div>App Content</div>
      </RootLayout>
    );

    expect(screen.getByText("App Content")).toBeInTheDocument();

    expect(screen.getByTestId("auth")).toBeInTheDocument();
    expect(screen.getByTestId("cart")).toBeInTheDocument();
    expect(screen.getByTestId("product")).toBeInTheDocument();
    expect(screen.getByTestId("auth-guard")).toBeInTheDocument();
    expect(screen.getByTestId("snackbar")).toBeInTheDocument();
  });
});
