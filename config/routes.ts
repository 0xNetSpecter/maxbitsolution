export const ROUTE_RULES = {
  "/": { redirect: "/movies" },
  "/movies": { isr: 60 },
  "/cinemas": { isr: 60 },
  "/movies/**": { swr: true },
  "/cinemas/**": { swr: true },
  "/movies/**/session/**": { ssr: false },
  "/tickets/**": { ssr: false },
  "/auth/**": { ssr: false },
  "/settings": { static: true },
};
