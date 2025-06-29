import { renderHook } from "@testing-library/react";
import { useUser } from "../useUser";
import { UserContext } from "src/context/UserContext";

describe("useUser", () => {
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
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return (
        <UserContext.Provider value={mockValue}>
          {children}
        </UserContext.Provider>
      );
    };

    const { result } = renderHook(() => useUser(), { wrapper });

    expect(result.current).toEqual(mockValue);
  });

  it("should throw error when used outside of provider", () => {
    expect(() => renderHook(() => useUser())).toThrow(
      "useUser must be used within a UserProvider"
    );
  });
});
