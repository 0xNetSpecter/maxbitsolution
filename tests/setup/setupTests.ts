import { vi } from "vitest";
import { setup } from "@nuxt/test-utils/e2e";
import { createPinia, setActivePinia } from "pinia";

if (typeof globalThis.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  globalThis.TextEncoder = TextEncoder;
  globalThis.TextDecoder = TextDecoder;
}

if (typeof globalThis.Buffer === "undefined") {
  globalThis.Buffer = require("buffer").Buffer;
}

globalThis.useFetch = vi.fn(() => ({
  data: { value: null },
  error: { value: null },
  pending: { value: false },
  refresh: vi.fn(),
}));

globalThis.useAsyncData = vi.fn(() => ({
  data: { value: null },
  error: { value: null },
  pending: { value: false },
  refresh: vi.fn(),
}));

const pinia = createPinia();
setActivePinia(pinia);

vi.mock("#imports", () => ({
  useAsyncData: vi.fn((_key, fn) => {
    const result = fn ? fn() : Promise.resolve(null);
    return {
      data: { value: result },
      error: { value: null },
      pending: { value: false },
      refresh: vi.fn(),
      execute: vi.fn(),
    };
  }),
  useLazyAsyncData: vi.fn((_key, fn) => {
    const result = fn ? fn() : Promise.resolve(null);
    return {
      data: { value: result },
      error: { value: null },
      pending: { value: false },
      refresh: vi.fn(),
    };
  }),
  useFetch: vi.fn((_url, _options) => ({
    data: { value: null },
    error: { value: null },
    pending: { value: false },
    refresh: vi.fn(),
    execute: vi.fn(),
  })),

  useRuntimeConfig: () => ({
    public: { apiBase: "/api" },
  }),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  useRoute: () => ({
    params: {},
    query: {},
    path: "/",
    fullPath: "/",
  }),
  tryUseNuxtApp: () => ({
    $router: { push: vi.fn() },
    $route: { params: {} },
    $pinia: pinia,
  }),

  ref: vi.fn((val) => ({ value: val })),
  computed: vi.fn((fn) => ({ value: fn() })),
  reactive: vi.fn((obj) => obj),
  watch: vi.fn(),
  watchEffect: vi.fn(),

  definePageMeta: vi.fn(),
  navigateTo: vi.fn(),
  abortNavigation: vi.fn(),
  useCookie: vi.fn(() => ({ value: null })),
  useRequestHeaders: vi.fn(() => ({})),
  useRequestEvent: vi.fn(() => null),
}));

globalThis.$fetch = vi.fn().mockResolvedValue({});

beforeAll(async () => {
  await setup({
    rootDir: process.cwd(),
    server: false,
    setupTimeout: 60000,
  });
});

afterEach(() => {
  vi.clearAllMocks();
  if (globalThis.$fetch) {
    globalThis.$fetch.mockClear();
  }
});
