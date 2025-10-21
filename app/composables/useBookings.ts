import { ref, computed, onMounted } from "vue";
import { useFetch } from "#app";

export function useBookings() {
  const bookings = ref<any[]>([]);
  const settings = ref<{ paymentWindow: number } | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      const [bookingsRes, settingsRes] = await Promise.all([
        useFetch("/api/me/bookings"),
        useFetch("/api/settings"),
      ]);

      if (bookingsRes.error.value)
        throw new Error(bookingsRes.error.value.data?.message);

      bookings.value = bookingsRes.data.value || [];
      settings.value = settingsRes.data.value || { paymentWindow: 300 };
    } catch (e: any) {
      error.value = e.message || "Ошибка при загрузке билетов";
    } finally {
      loading.value = false;
    }
  }

  const unpaid = computed(() =>
    bookings.value.filter((b) => b.status === "UNPAID")
  );
  const upcoming = computed(() =>
    bookings.value.filter(
      (b) => b.status === "PAID" && new Date(b.startTime) > new Date()
    )
  );
  const past = computed(() =>
    bookings.value.filter((b) => new Date(b.startTime) <= new Date())
  );

  async function pay(bookingId: number) {
    try {
      const { error } = await useFetch(`/api/bookings/${bookingId}/payments`, {
        method: "POST",
      });
      if (error.value) throw new Error(error.value.data?.message);
      await fetchAll();
    } catch (e: any) {
      console.error("[Payment Error]", e);
    }
  }

  onMounted(fetchAll);

  return {
    bookings,
    unpaid,
    upcoming,
    past,
    settings,
    loading,
    error,
    pay,
    fetchAll,
  };
}
