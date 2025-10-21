import { describe, it, expect, vi, beforeEach } from "vitest";
import { useMovies } from "@/composables/useMovies";

vi.stubGlobal(
  "useAsyncData",
  vi.fn(() => ({
    data: { value: null },
    error: { value: null },
    pending: { value: false },
    refresh: vi.fn(),
  }))
);

vi.mock("#imports", () => ({
  useAsyncData: vi.fn(() => ({
    data: { value: null },
    error: { value: null },
    pending: { value: false },
    refresh: vi.fn(),
  })),
  useRuntimeConfig: () => ({
    public: { apiBase: "/api" },
  }),
  ref: (val: any) => ({ value: val }),
  computed: (fn: any) => ({ value: fn() }),
}));

describe("useMovies composable", () => {
  let useAsyncDataMock: any;

  beforeEach(() => {
    useAsyncDataMock = vi.mocked(useAsyncData);
    globalThis.$fetch = vi
      .fn()
      .mockResolvedValue([{ id: 1, title: "Matrix", year: 1999 }]);
  });

  it("fetches movies data from the API", async () => {
    const mockMovies = [{ id: 1, title: "Matrix", year: 1999 }];

    useAsyncDataMock.mockReturnValue({
      data: { value: mockMovies },
      error: { value: null },
      pending: { value: false },
      refresh: vi.fn(),
    });

    const { movies, fetchMovies } = useMovies();

    expect(movies.value).toEqual(mockMovies);

    if (fetchMovies) {
      await fetchMovies();
      expect(movies.value).toEqual(mockMovies);
    }
  });
});
