import { useApiFetch } from "@/composables/useApiFetch";
import type { AppSettings } from "@/types/settings";

export const SettingsApi = {
  get() {
    return useApiFetch<AppSettings>("/settings", {
      default: () => ({ bookingPaymentTimeSeconds: 0 }),
    });
  },
};
