import { formatCurrency } from "../currency";

describe("formatCurrency", () => {
  it("should format number to USD with en-US locale", () => {
    const result = formatCurrency(1234.56);
    expect(result).toBe("$1,234.56");
  });

  it("should format number to EUR with de-DE locale", () => {
    const result = formatCurrency(1234.56, "de-DE", "EUR");
    expect(result).toBe("1.234,56 €");
  });

  it("should format number to IDR with id-ID locale", () => {
    const result = formatCurrency(1500000, "id-ID", "IDR");
    expect(result).toBe("Rp 1.500.000,00");
  });

  it("should format negative number correctly", () => {
    const result = formatCurrency(-500, "en-US", "USD");
    expect(result).toBe("-$500.00");
  });

  it("should handle zero", () => {
    const result = formatCurrency(0);
    expect(result).toBe("$0.00");
  });
});
