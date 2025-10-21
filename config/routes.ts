export const ROUTE_RULES = {
  "/movies/**": { ssr: true },
  "/cinemas/**": { ssr: true },
  "/tickets/**": { ssr: false },
  "/auth/**": { ssr: false },
  "/settings": { static: true },
};
