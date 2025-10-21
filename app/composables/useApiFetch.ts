import { useUserStore } from "@/stores/user";

type HttpMethod = Lowercase<"GET" | "POST" | "PUT" | "PATCH" | "DELETE">;

type UseApiFetchOptions<TBody> = {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  default?: () => any;
  lazy?: boolean;
  immediate?: boolean;
  key?: string;
};

export function useApiFetch<TResponse, TBody = unknown>(
  url: string,
  options: UseApiFetchOptions<TBody> = {}
) {
  const user = useUserStore();

  return useFetch<TResponse>(url, {
    baseURL: "/api",
    method: (options.method?.toLowerCase() as any) ?? "get",
    body: options.body as any,
    key: options.key,
    headers: {
      ...(options.headers || {}),
      ...(user.token ? { Authorization: `Bearer ${user.token}` } : {}),
      "Content-Type": "application/json",
    },
    default: options.default ?? (() => null),
    lazy: options.lazy ?? false,
    immediate: options.immediate ?? true,
  });
}
