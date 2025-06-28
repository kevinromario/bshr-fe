import { AUTH_TOKEN_KEY } from "src/constants";
import axios from "src/lib/axios";

type LoginPayload = {
  username: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await axios.post("/auth/login", payload);
  localStorage.setItem(AUTH_TOKEN_KEY, res.data.token);
  return res.data;
}

export function logout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}
