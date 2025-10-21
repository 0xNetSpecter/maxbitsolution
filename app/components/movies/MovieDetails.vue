<script setup lang="ts">
import PosterImage from "@/components/common/PosterImage.vue";
import type { Movie } from "~/types/movies";

defineProps<{ movie: Movie }>();
</script>

<template>
  <div class="flex flex-col md:flex-row gap-6 mb-10">
    <PosterImage
      :src="movie.posterImage"
      :alt="movie.title"
      class="w-64 h-96 rounded-xl shadow-lg"
      cover
    />
    <div>
      <h1 class="text-3xl font-bold text-gray-600 mb-4">{{ movie.title }}</h1>
      <p class="text-gray-600 mb-4">{{ movie.description }}</p>
      <ul class="text-gray-600 space-y-1">
        <li class="text-gray-600">Год: {{ movie.year }}</li>
        <li class="text-gray-600">
          Продолжительность: {{ movie.lengthMinutes }} мин
        </li>
        <li class="text-gray-600">Рейтинг: ★ {{ movie.rating }}</li>
      </ul>
    </div>
  </div>
</template>
