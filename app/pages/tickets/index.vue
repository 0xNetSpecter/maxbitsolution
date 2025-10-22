<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "#app";
import { useUserStore } from "@/stores/user";
import { TicketsApi } from "@/api/tickets";
import { SettingsApi } from "@/api/settings";
import { BookingsApi } from "@/api/bookings";
import type { MyBooking } from "@/types/me";

const router = useRouter();
const user = useUserStore();

if (!user.isLoggedIn) {
  router.push({
    path: "/auth/login",
    query: { redirect: "/tickets" },
  });
}

const bookings = ref<MyBooking[]>([]);
const settings = ref<{ bookingPaymentTimeSeconds: number }>({
  bookingPaymentTimeSeconds: 0,
});
const loading = ref(true);

async function loadData(force = false) {
  loading.value = true;
  const [bookingsRes, settingsRes] = await Promise.all([
    TicketsApi.getBookings(force),
    SettingsApi.get(),
  ]);

  bookings.value = bookingsRes.data.value ?? [];
  settings.value = settingsRes.data.value ?? { bookingPaymentTimeSeconds: 0 };
  loading.value = false;
}

onMounted(() => loadData(true));

function getRemainingSeconds(booking: MyBooking) {
  if (!booking.bookedAt) return 0;
  const bookedTime = new Date(booking.bookedAt).getTime();
  const now = Date.now();
  const diff =
    settings.value.bookingPaymentTimeSeconds * 1000 - (now - bookedTime);
  return Math.max(0, Math.floor(diff / 1000));
}

const unpaid = computed(() => bookings.value.filter((b) => !b.isPaid));
const paid = computed(() => bookings.value.filter((b) => b.isPaid));

async function payBooking(bookingId: string) {
  try {
    const { data, error } = await BookingsApi.pay(bookingId);

    if (error.value) {
      return;
    }

    const booking = bookings.value.find((b) => b.id === bookingId);
    if (booking) booking.isPaid = true;

    await loadData(true);
  } catch (err) {
    console.error(err);
    alert("Error");
  }
}

setInterval(() => {
  const now = Date.now();
  bookings.value = bookings.value.filter(async (b) => {
    if (b.isPaid) return true;
    const bookedAt = new Date(b.bookedAt).getTime();
    const expiredAt =
      bookedAt + settings.value.bookingPaymentTimeSeconds * 1000;
    if (now > expiredAt) {
      await loadData(true);
    }
    return now < expiredAt;
  });
}, 1000);
</script>

<template>
  <section class="max-w-5xl mx-auto p-6 text-white">
    <h1 class="text-3xl font-bold mb-8 text-center text-gray-600">
      Мои билеты
    </h1>

    <div v-if="loading" class="text-gray-400 text-center">Загрузка...</div>

    <div
      v-else-if="!bookings.length"
      class="text-gray-400 text-center text-lg mt-10"
    >
      У вас пока нет билетов
    </div>

    <template v-else>
      <div v-if="unpaid.length" class="mb-10">
        <h2 class="text-xl font-semibold mb-2 text-gray-600">Неоплаченные</h2>
        <hr class="border-gray-700 mb-4" />

        <div
          v-for="b in unpaid"
          :key="b.id"
          class="flex justify-between items-center bg-neutral-900 p-4 rounded-lg mb-3"
        >
          <div>
            <p class="text-gray-400 text-sm mb-1">
              ID сеанса: {{ b.movieSessionId }}
            </p>
            <p class="text-yellow-400 text-sm">
              Места:
              <span
                v-for="seat in b.seats"
                :key="seat.rowNumber + '-' + seat.seatNumber"
              >
                Ряд {{ seat.rowNumber }}, место {{ seat.seatNumber }}
              </span>
            </p>
          </div>

          <div class="flex flex-col items-end gap-2">
            <button
              @click="payBooking(b.id)"
              class="px-4 py-2 border border-blue-500 rounded-md text-blue-400 hover:bg-blue-500 hover:text-white transition"
            >
              Оплатить
            </button>

            <span class="text-sm text-gray-400">
              Осталось: {{ Math.floor(getRemainingSeconds(b) / 60) }}:{{
                (getRemainingSeconds(b) % 60).toString().padStart(2, "0")
              }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="paid.length">
        <h2 class="text-xl font-semibold mb-2 text-gray-600">Оплаченные</h2>
        <hr class="border-gray-700 mb-4" />

        <div
          v-for="b in paid"
          :key="b.id"
          class="bg-neutral-900 p-4 rounded-lg mb-3"
        >
          <p class="text-gray-400 text-sm mb-1">
            ID сеанса: {{ b.movieSessionId }}
          </p>

          <p class="text-yellow-400 text-sm">
            Места:
            <span
              v-for="seat in b.seats"
              :key="seat.rowNumber + '-' + seat.seatNumber"
            >
              Ряд {{ seat.rowNumber }}, место {{ seat.seatNumber }}
            </span>
          </p>

          <p class="text-gray-500 text-xs mt-1">
            Забронировано:
            {{ new Date(b.bookedAt).toLocaleString("ru-RU") }}
          </p>
        </div>
      </div>
    </template>
  </section>
</template>
