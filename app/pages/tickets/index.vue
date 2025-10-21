<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { useFetch } from "#app";

const user = useUserStore();
const {
  data: tickets,
  pending,
  error,
} = await useFetch("/api/tickets", {
  headers: { Authorization: `Bearer ${user.token}` },
});
</script>

<template>
  <section class="max-w-7xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">🎟 Мои билеты</h1>

    <div v-if="pending" class="text-gray-400">Загрузка...</div>
    <div v-else-if="error" class="text-red-400">
      Ошибка: {{ error.message }}
    </div>

    <div v-else-if="!tickets?.length" class="text-gray-400">
      У вас пока нет билетов 😢
    </div>

    <ul v-else class="space-y-4">
      <li
        v-for="ticket in tickets"
        :key="ticket.id"
        class="bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition"
      >
        <h2 class="text-lg font-semibold text-white">
          {{ ticket.movieTitle }}
        </h2>
        <p class="text-gray-400 text-sm">
          {{ ticket.cinema }} • {{ ticket.date }} • {{ ticket.time }}
        </p>
        <p class="text-yellow-400">Место: {{ ticket.seat }}</p>
      </li>
    </ul>
  </section>
</template>
