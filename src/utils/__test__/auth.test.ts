import { AUTH_TOKEN_KEY } from "src/constants";
import { parseJwt, isTokenValid } from "../auth";

beforeEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

function createJwt(payload: object) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  const signature = "signature";
  return `${header}.${body}.${signature}`;
}

describe("parseJwt", () => {
  it("should parse a valid JWT", () => {
    const payload = { iat: 123456 };
    const token = createJwt(payload);
    const result = parseJwt(token);
    expect(result).toEqual(payload);
  });

  it("should return null for invalid JWT", () => {
    const result = parseJwt("invalid.token.here");
    expect(result).toBeNull();
  });

  it("should return null for malformed payload", () => {
    const token = `header.${btoa("not-json")}.sig`;
    const result = parseJwt(token);
    expect(result).toBeNull();
  });
});

describe("isTokenValid", () => {
  it("should return false if no token", () => {
    expect(isTokenValid()).toBe(false);
  });

  it("should return false if token is invalid", () => {
    localStorage.setItem(AUTH_TOKEN_KEY, "invalid.token.parts");
    expect(isTokenValid()).toBe(false);
  });

  it("should return false if token has no iat", () => {
    const token = createJwt({ sub: "user" });
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    expect(isTokenValid()).toBe(false);
  });

  it("should return false if token is older than 24h", () => {
    const pastIat = Math.floor((Date.now() - 25 * 60 * 60 * 1000) / 1000);
    const token = createJwt({ iat: pastIat });
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    expect(isTokenValid()).toBe(false);
  });

  it("should return true if token is within 24h", () => {
    const recentIat = Math.floor((Date.now() - 60 * 60 * 1000) / 1000);
    const token = createJwt({ iat: recentIat });
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    expect(isTokenValid()).toBe(true);
  });
});
