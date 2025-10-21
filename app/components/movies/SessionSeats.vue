<script setup lang="ts">
defineProps<{
  session: any;
  isBooked: (row: number, seat: number) => boolean;
  isSelected: (row: number, seat: number) => boolean;
  toggleSeat: (row: number, seat: number) => void;
}>();
</script>

<template>
  <div
    v-if="session"
    class="relative max-w-full max-h-[70vh] overflow-auto rounded-lg p-4 flex"
  >
    <div class="inline-block min-w-max space-y-3 mx-auto">
      <div class="flex items-center gap-2 justify-start mb-2">
        <span class="w-16"></span>
        <div class="flex gap-2">
          <span
            v-for="seat in session.seats.seatsPerRow"
            :key="'header-' + seat"
            class="w-8 h-8 flex items-center justify-center text-gray-400 text-sm text-gray-600"
          >
            {{ seat }}
          </span>
        </div>
      </div>

      <div
        v-for="row in session.seats.rows"
        :key="row"
        class="flex items-center gap-2 justify-start"
      >
        <span class="w-16 text-right text-gray-400 shrink-0 text-gray-600">
          ряд {{ row }}
        </span>
        <div class="flex gap-2">
          <button
            v-for="seat in session.seats.seatsPerRow"
            :key="seat"
            :disabled="isBooked(row, seat)"
            @click="toggleSeat(row, seat)"
            class="w-8 h-8 rounded border transition flex-shrink-0 text-gray-600"
            :class="[
              isBooked(row, seat)
                ? 'bg-red-500 cursor-not-allowed'
                : isSelected(row, seat)
                ? 'bg-blue-500'
                : 'hover:bg-gray-700',
            ]"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>
