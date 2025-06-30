import axios from "src/lib/axios";
import { login, logout } from "../auth.service";
import { AUTH_TOKEN_KEY } from "src/constants";

jest.mock("src/lib/axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("login", () => {
  const payload = {
    username: "testuser",
    password: "password123",
  };

  const mockToken = "fake-jwt-token";

  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it("should call API and store token in localStorage", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { token: mockToken },
    });

    const result = await login(payload);

    expect(mockedAxios.post).toHaveBeenCalledWith("/auth/login", payload);
    expect(result.token).toBe(mockToken);
    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBe(mockToken);
  });

  it("should throw an error if login fails", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Invalid credentials"));

    await expect(login(payload)).rejects.toThrow("Invalid credentials");
    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull();
  });
});

describe("logout", () => {
  it("should remove token from localStorage", () => {
    localStorage.setItem(AUTH_TOKEN_KEY, "token-to-remove");

    logout();

    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull();
  });
});
