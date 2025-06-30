import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoginForm } from "../LoginForm";
import React from "react";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("src/hooks/useAuth", () => ({
  useAuth: () => ({ setUser: jest.fn() }),
}));

jest.mock("src/hooks/useSnackbar", () => ({
  useSnackbar: () => ({ showSnackbar: jest.fn() }),
}));

jest.mock("src/hooks/useCart", () => ({
  useCart: () => ({ clearCarts: jest.fn() }),
}));

jest.mock("src/hooks/useProduct", () => ({
  useProduct: () => ({ clearProducts: jest.fn() }),
}));

jest.mock("src/services/auth.service", () => ({
  login: jest.fn(),
}));

jest.mock("src/services/user.service", () => ({
  getUserById: jest.fn(),
}));

jest.mock("src/utils/handleAxiosError", () => ({
  handleAxiosError: () => "Login failed",
}));

import { login } from "src/services/auth.service";
import { getUserById } from "src/services/user.service";

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form fields", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("inputUsername")).toBeInTheDocument();
    expect(screen.getByTestId("inputPassword")).toBeInTheDocument();
    expect(screen.getByTestId("loginBtn")).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty", async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByTestId("loginBtn"));

    expect(
      await screen.findByText(/username must be at least 8 characters/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password must be at least 8 characters/i)
    ).toBeInTheDocument();
  });

  it("handles successful login", async () => {
    const token = btoa(
      JSON.stringify({ sub: 123, iat: Math.floor(Date.now() / 1000) })
    );
    (login as jest.Mock).mockResolvedValue({ token: `a.${token}.b` });
    (getUserById as jest.Mock).mockResolvedValue({
      id: 123,
      name: { firstname: "kevin", lastname: "ryan" },
    });

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "kevinryan" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "kev02937@" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        username: "kevinryan",
        password: "kev02937@",
      });
      expect(getUserById).toHaveBeenCalledWith(123);
      expect(mockPush).toHaveBeenCalledWith("/cart");
    });
  });

  it("handles login failure", async () => {
    (login as jest.Mock).mockRejectedValue(new Error("Invalid login"));

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "kevinryan" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Login failed")).toBeInTheDocument();
    });
  });
});
