<script setup lang="ts">
defineProps<{
  grouped: Record<string, Record<string, any[]>>;
  movieId: number;
}>();
</script>

<template>
  <div v-for="(cinemas, date) in grouped" :key="date" class="mb-8">
    <h2 class="text-2xl font-semibold mb-3 text-gray-600">{{ date }}</h2>
    <hr class="border-gray-700 mb-4" />
    <div
      v-for="(sessions, cinemaName) in cinemas"
      :key="cinemaName"
      class="mb-6"
    >
      <h3 class="text-lg font-medium text-gray-600 mb-2">{{ cinemaName }}</h3>
      <div class="flex flex-wrap gap-3">
        <NuxtLink
          v-for="session in sessions"
          :key="session.id"
          :to="`/movies/${movieId}/session/${session.id}`"
          class="px-4 py-2 rounded-lg border border-gray-600 hover:border-blue-400 hover:text-blue-400 transition"
        >
          {{ session.startTime }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
