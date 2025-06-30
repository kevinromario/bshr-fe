import axios from "src/lib/axios";
import { getAllProducts } from "../product.service";
import { Product } from "src/types/product";

jest.mock("src/lib/axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getAllProducts", () => {
  it("should fetch products and return them", async () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: "Mock Product",
        price: 199000,
        description: "Deskripsi produk",
        category: "electronics",
        image: "https://example.com/product.jpg",
        rating: {
          rate: 4.5,
          count: 120,
        },
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });

    const result = await getAllProducts();

    expect(axios.get).toHaveBeenCalledWith("/products");
    expect(result).toEqual(mockProducts);
  });

  it("should throw error if request fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

    await expect(getAllProducts()).rejects.toThrow("Network error");
  });
});
