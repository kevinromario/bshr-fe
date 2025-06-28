import axios from "../axios";
import { API_BE } from "src/constants";

describe("axios", () => {
  it("should have correct baseURL", () => {
    expect(axios.defaults.baseURL).toBe(API_BE);
  });

  it("should be an axios instance", () => {
    expect(typeof axios.get).toBe("function");
    expect(typeof axios.post).toBe("function");
  });
});
