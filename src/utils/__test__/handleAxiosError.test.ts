import { handleAxiosError } from "../handleAxiosError";

describe("handleAxiosError", () => {
  it("should return message for axios error with .data.message", () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 400,
        data: {
          message: "Invalid credentials",
        },
      },
    };

    const result = handleAxiosError(error);
    expect(result).toBe("Error 400: Invalid credentials");
  });

  it("should return message for axios error with plain data", () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 404,
        data: "Not Found",
      },
    };

    const result = handleAxiosError(error);
    expect(result).toBe("Error 404: Not Found");
  });

  it("should return fallback message for axios error without data", () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 500,
        data: undefined,
      },
    };

    const result = handleAxiosError(error);
    expect(result).toBe("Error 500: Unexpected error");
  });

  it("should return string for non-axios error (string)", () => {
    const result = handleAxiosError("Unknown failure");
    expect(result).toBe("Error: Unknown failure");
  });
});
