import { renderHook } from "@testing-library/react";
import { useSnackbar } from "../useSnackbar";
import { SnackbarContext } from "src/context";
import React from "react";

describe("useSnackbar", () => {
  it("should throw error when used outside SnackbarProvider", () => {
    expect(() => renderHook(() => useSnackbar())).toThrow(
      "useSnackbar must be used within a SnackbarProvider"
    );
  });

  it("should return context value when used inside SnackbarProvider", () => {
    const mockContextValue = {
      showSnackbar: jest.fn(),
      hideSnackbar: jest.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SnackbarContext.Provider value={mockContextValue}>
        {children}
      </SnackbarContext.Provider>
    );

    const { result } = renderHook(() => useSnackbar(), { wrapper });

    expect(result.current).toBe(mockContextValue);
  });
});
