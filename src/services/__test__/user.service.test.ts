import { getUserById } from "src/services/user.service";
import axios from "src/lib/axios";

jest.mock("src/lib/axios");

describe("getUserById", () => {
  it("should return user without password", async () => {
    const mockUser = {
      id: 3,
      username: "kevinryan",
      email: "kevin@gmail.com",
      password: "kev02937@",
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockUser });

    const result = await getUserById(1);

    expect(result).toEqual({
      id: 3,
      username: "kevinryan",
      email: "kevin@gmail.com",
    });

    expect(result).not.toHaveProperty("password");
  });

  it("should throw error if axios fails", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Network error"));

    await expect(getUserById(999)).rejects.toThrow("Network error");
  });
});
