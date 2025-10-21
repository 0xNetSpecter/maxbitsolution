import { describe, it, expect, vi, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { CinemasApi } from "@/api/cinemas";

vi.stubGlobal(
  "useFetch",
  vi.fn((url, options) => globalThis.$fetch(url, options))
);

describe("CinemasApi", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);

    globalThis.$fetch = vi.fn().mockResolvedValue([{ id: 1, name: "IMAX" }]);
  });

  it("performs a GET request to /cinemas", async () => {
    const mockResponse = [{ id: 1, name: "IMAX" }];
    globalThis.$fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await CinemasApi.getAll();

    expect(globalThis.$fetch).toHaveBeenCalledWith(
      expect.stringContaining("/cinemas"),
      expect.objectContaining({
        method: expect.stringMatching(/get/i),
      })
    );

    expect(result).toEqual(mockResponse);
  });
});
