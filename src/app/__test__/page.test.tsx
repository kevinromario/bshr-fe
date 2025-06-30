import { render, screen } from "@testing-library/react";
import Home from "../page";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("src/components/CenteredContainer", () => ({
  CenteredContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="centered-container">{children}</div>
  ),
}));

describe("Home Page", () => {
  it("renders the title and welcome message", () => {
    render(<Home />);

    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("subtitle")).toBeInTheDocument();
  });

  it("renders login button with correct href", () => {
    render(<Home />);
    const loginButton = screen.getByTestId("loginBtn");

    const loginLink = loginButton.closest("a");
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("sets the document title on mount", () => {
    render(<Home />);
    expect(document.title).toBe("Home - E-Commerce");
  });

  it("renders inside CenteredContainer", () => {
    render(<Home />);
    expect(screen.getByTestId("centered-container")).toBeInTheDocument();
  });
});
