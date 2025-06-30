import { render, screen } from "@testing-library/react";
import Login from "../page";
import React from "react";

jest.mock("src/components/CenteredContainer", () => ({
  CenteredContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="centered-container">{children}</div>
  ),
}));

jest.mock("../LoginForm", () => ({
  LoginForm: () => <div data-testid="login-form">Mocked Login Form</div>,
}));

describe("Login Page", () => {
  it("sets document title on mount", () => {
    render(<Login />);
    expect(document.title).toBe("Login - E-Commerce");
  });

  it("renders LoginForm inside CenteredContainer", () => {
    render(<Login />);
    expect(screen.getByTestId("centered-container")).toBeInTheDocument();
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });
});
