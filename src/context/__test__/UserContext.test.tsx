import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserProvider, UserContext } from "../UserContext";

const TestComponent = () => {
  const context = React.useContext(UserContext);

  if (!context) return <div>No context</div>;

  const { user, setUser, clearUser } = context;

  return (
    <div>
      <div data-testid="username">{user ? user.username : "No user"}</div>
      <button
        data-testid="setUserBtn"
        onClick={() =>
          setUser({
            id: 3,
            username: "kevinryan",
            email: "kevin@gmail.com",
            name: {
              firstname: "kevin",
              lastname: "ryan",
            },
          })
        }
      >
        Set User
      </button>
      <button data-testid="clearUserBtn" onClick={clearUser}>
        Clear User
      </button>
    </div>
  );
};

describe("UserProvider", () => {
  it("should provide initial null user", () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    expect(screen.getByTestId("username").textContent).toBe("No user");
  });

  it("should set user correctly", () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    fireEvent.click(screen.getByTestId("setUserBtn"));
    expect(screen.getByTestId("username").textContent).toBe("kevinryan");
  });

  it("should clear user correctly", () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    fireEvent.click(screen.getByTestId("setUserBtn"));
    fireEvent.click(screen.getByTestId("clearUserBtn"));
    expect(screen.getByTestId("username").textContent).toBe("No user");
  });
});
