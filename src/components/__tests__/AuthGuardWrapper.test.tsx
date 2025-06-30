import { render, screen } from "@testing-library/react";
import { AuthGuardWrapper } from "../AuthGuardWrapper";
import { useAuth } from "src/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("src/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

const mockReplace = jest.fn();

const TestComponent = () => <div>Protected Content</div>;

describe("AuthGuardWrapper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
  });

  it("should render null if authStateLoaded is false", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      authStateLoaded: false,
    });
    (usePathname as jest.Mock).mockReturnValue("/cart");

    const { container } = render(
      <AuthGuardWrapper>
        <TestComponent />
      </AuthGuardWrapper>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should redirect to /login if route is protected and user is not authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      authStateLoaded: true,
    });
    (usePathname as jest.Mock).mockReturnValue("/cart");

    render(
      <AuthGuardWrapper>
        <TestComponent />
      </AuthGuardWrapper>
    );

    expect(mockReplace).toHaveBeenCalledWith("/login");
  });

  it("should redirect to /cart if user is authenticated and on /login", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 1 },
      authStateLoaded: true,
    });
    (usePathname as jest.Mock).mockReturnValue("/login");

    render(
      <AuthGuardWrapper>
        <TestComponent />
      </AuthGuardWrapper>
    );

    expect(mockReplace).toHaveBeenCalledWith("/cart");
  });

  it("should render children if route is public or user is authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 1 },
      authStateLoaded: true,
    });
    (usePathname as jest.Mock).mockReturnValue("/cart");

    render(
      <AuthGuardWrapper>
        <TestComponent />
      </AuthGuardWrapper>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("should render children on public route even without user", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      authStateLoaded: true,
    });
    (usePathname as jest.Mock).mockReturnValue("/");

    render(
      <AuthGuardWrapper>
        <TestComponent />
      </AuthGuardWrapper>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
