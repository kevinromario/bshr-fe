/* eslint-disable @typescript-eslint/no-unused-vars */
import { AUTH_TOKEN_KEY } from "src/constants";

export type JwtPayload = {
  sub: number;
  user: string;
  iat: number;
};

export function parseJwt(token: string): JwtPayload | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload as JwtPayload;
  } catch (error: unknown) {
    return null;
  }
}

export function isTokenValid(): boolean {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return false;

  const payload = parseJwt(token);
  if (!payload || !payload.iat) return false;

  const issuedAt = payload.iat * 1000;
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000;

  return now - issuedAt < maxAge;
}
