import { capitalizeFirstLetter } from "../string";
import { formatDateOnly } from "../string";

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

describe("formatDateOnly", () => {
  it("should format a Date object correctly", () => {
    const date = new Date("2023-06-30T00:00:00Z");
    const formatted = formatDateOnly(date);
    expect(formatted).toBe("June 30, 2023");
  });

  it("should format a date string correctly", () => {
    const date = "2024-01-01";
    const formatted = formatDateOnly(date);
    expect(formatted).toBe("January 1, 2024");
  });

  it("should handle invalid date string", () => {
    const date = "not-a-date";
    const formatted = formatDateOnly(date);
    expect(formatted).toBe("Invalid Date");
  });
});
