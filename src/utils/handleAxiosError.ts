import axios from "axios";

export function handleAxiosError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      "Unexpected error";

    return `Error ${status}: ${message}`;
  }
  return `Error: ${error}`;
}
