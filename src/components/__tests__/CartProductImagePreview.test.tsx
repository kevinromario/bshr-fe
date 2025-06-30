import { render, screen } from "@testing-library/react";
import { CartImagePreview } from "../CartProductImagePreview";
import type { ProductWithQuantity } from "src/types/cart";

const createProduct = (id: number, image: string): ProductWithQuantity => ({
  id,
  title: `Product ${id}`,
  price: 100,
  description: "desc",
  category: "cat",
  image,
  rating: { rate: 4, count: 10 },
  quantity: 1,
});

describe("CartImagePreview", () => {
  it("renders nothing when products array is empty", () => {
    render(<CartImagePreview products={[]} />);
    expect(screen.queryByAltText("product 1")).not.toBeInTheDocument();
  });

  it("renders first image only when there is 1 product", () => {
    const products = [createProduct(1, "image1.jpg")];

    render(<CartImagePreview products={products} />);

    expect(screen.getByAltText("product 1")).toHaveAttribute(
      "src",
      "image1.jpg"
    );
    expect(screen.queryByAltText("product 2")).not.toBeInTheDocument();
    expect(screen.queryByText("+")).not.toBeInTheDocument();
  });

  it("renders both images without +n badge when there are 2 products", () => {
    const products = [
      createProduct(1, "image1.jpg"),
      createProduct(2, "image2.jpg"),
    ];

    render(<CartImagePreview products={products} />);

    expect(screen.getByAltText("product 1")).toHaveAttribute(
      "src",
      "image1.jpg"
    );
    expect(screen.getByAltText("product 2")).toHaveAttribute(
      "src",
      "image2.jpg"
    );
    expect(screen.queryByText(/\+\d+/)).not.toBeInTheDocument();
  });

  it("renders +n badge when there are more than 2 products", () => {
    const products = [
      createProduct(1, "image1.jpg"),
      createProduct(2, "image2.jpg"),
      createProduct(3, "image3.jpg"),
      createProduct(4, "image4.jpg"),
    ];

    render(<CartImagePreview products={products} />);

    expect(screen.getByAltText("product 1")).toBeInTheDocument();
    expect(screen.getByAltText("product 2")).toBeInTheDocument();

    const remainingProduct = products.length - 2;
    expect(screen.getByText(`+${remainingProduct}`)).toBeInTheDocument();
  });
});
