import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { SnackbarProvider, SnackbarContext } from "../SnackbarContext";
import "@testing-library/jest-dom";

describe("SnackbarProvider", () => {
  const renderWithProvider = (ui: React.ReactNode) => {
    return render(<SnackbarProvider>{ui}</SnackbarProvider>);
  };

  it("should render children correctly", () => {
    renderWithProvider(<div>Child content</div>);
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("should show a snackbar when showSnackbar is called", () => {
    const TestComponent = () => {
      const { showSnackbar } = React.useContext(SnackbarContext)!;

      return (
        <button
          onClick={() =>
            showSnackbar({ message: "Test message", severity: "success" })
          }
        >
          Show Snackbar
        </button>
      );
    };

    renderWithProvider(<TestComponent />);

    const btn = screen.getByText("Show Snackbar");
    act(() => {
      fireEvent.click(btn);
    });

    expect(screen.getByText("Test message")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-filledSuccess");
  });

  it("should close the snackbar when close button is clicked", () => {
    const TestComponent = () => {
      const { showSnackbar } = React.useContext(SnackbarContext)!;

      return (
        <button
          onClick={() =>
            showSnackbar({ message: "Close me", severity: "error" })
          }
        >
          Trigger Snackbar
        </button>
      );
    };

    renderWithProvider(<TestComponent />);

    act(() => {
      fireEvent.click(screen.getByText("Trigger Snackbar"));
    });

    expect(screen.getByText("Close me")).toBeInTheDocument();

    const closeBtn = screen.getByRole("button", { name: /close/i });

    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(screen.queryByText("Close me")).not.toBeInTheDocument();
  });
});
