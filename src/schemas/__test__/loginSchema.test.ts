import { loginSchema } from "../loginSchema";

describe("loginSchema", () => {
  it("should pass with valid username and password", async () => {
    const validData = {
      username: "testuser1",
      password: "secure123",
    };

    await expect(loginSchema.validate(validData)).resolves.toEqual(validData);
  });

  it("should fail when username is too short", async () => {
    const invalidData = {
      username: "short",
      password: "secure123",
    };

    await expect(loginSchema.validate(invalidData)).rejects.toThrow();
  });

  it("should fail when password is missing", async () => {
    const invalidData = {
      username: "validuser",
    };

    await expect(loginSchema.validate(invalidData)).rejects.toThrow();
  });
});
