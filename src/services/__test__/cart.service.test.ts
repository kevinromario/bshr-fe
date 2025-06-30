import axios from "src/lib/axios";
import { getAllCarts } from "../cart.service";
import { CartResponse } from "src/types/cart";

jest.mock("src/lib/axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getAllCarts", () => {
  it("should fetch and return all carts", async () => {
    const mockCarts: CartResponse[] = [
      {
        id: 1,
        userId: 42,
        date: "2025-06-30",
        __v: 0,
        products: [
          {
            productId: 1,
            quantity: 2,
          },
          {
            productId: 3,
            quantity: 1,
          },
        ],
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockCarts });

    const result = await getAllCarts();

    expect(axios.get).toHaveBeenCalledWith("/carts");
    expect(result).toEqual(mockCarts);
  });

  it("should throw an error if request fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch"));

    await expect(getAllCarts()).rejects.toThrow("Failed to fetch");
  });
});
