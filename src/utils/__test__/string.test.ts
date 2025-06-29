import { capitalizeFirstLetter } from "../string";

describe("capitalizeFirstLetter", () => {
  it("should capitalize the first letter of a lowercase word", () => {
    expect(capitalizeFirstLetter("kevin")).toBe("Kevin");
  });

  it("should keep the first letter uppercase if already capitalized", () => {
    expect(capitalizeFirstLetter("Kevin")).toBe("Kevin");
  });

  it("should work with a single character", () => {
    expect(capitalizeFirstLetter("a")).toBe("A");
  });

  it("should return empty string when input is empty", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("should not affect the rest of the string", () => {
    expect(capitalizeFirstLetter("kEVIN")).toBe("KEVIN");
  });

  it("should handle non-alphabetic first character", () => {
    expect(capitalizeFirstLetter("1kevin")).toBe("1kevin");
  });
});
