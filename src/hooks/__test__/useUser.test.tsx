import { renderHook } from "@testing-library/react";
import { useAuth } from "../useAuth";
import { AuthContext } from "src/context/AuthContext";

describe("useAuth", () => {
  it("should return context value when used inside provider", () => {
    const mockValue = {
      user: {
        id: 3,
        username: "kevinryan",
        email: "kevin@gmail.com",
        name: {
          firstname: "kevin",
          lastname: "ryan",
        },
      },
      setUser: () => null,
      clearUser: () => null,
      logout: () => null,
      authStateLoaded: true,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return (
        <AuthContext.Provider value={mockValue}>
          {children}
        </AuthContext.Provider>
      );
    };

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toEqual(mockValue);
  });

  it("should throw error when used outside of provider", () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      "useAuth must be used within a AuthProvider"
    );
  });
});
