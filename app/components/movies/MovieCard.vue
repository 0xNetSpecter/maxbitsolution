<template>
  <div
    class="group bg-gray-800 rounded-2xl overflow-hidden hover:shadow-lg transition cursor-pointer"
  >
    <div class="overflow-hidden relative">
      <img
        :src="fullPoster"
        :alt="movie.title"
        class="w-full h-80 object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div
        class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
    </div>

    <div class="p-4 flex flex-col gap-2">
      <h2 class="text-xl font-semibold text-white">{{ movie.title }}</h2>

      <p class="text-gray-400 text-sm">
        {{ movie.year }} - {{ movie.lengthMinutes }} мин
      </p>

      <p class="text-yellow-400 font-bold">★ {{ movie.rating }}</p>

      <p class="text-gray-300 text-sm line-clamp-3">
        {{ movie.description }}
      </p>

      <UButton
        :to="`/movies/${movie.id}`"
        class="mt-3"
        color="primary"
        size="sm"
        block
        @click="handleClick"
      >
        Просмотреть сеансы
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMoviesStore } from "@/stores/movies";

const {
  public: { imageBase },
} = useRuntimeConfig();

const store = useMoviesStore();

const props = defineProps<{
  movie: {
    id: number;
    title: string;
    year: number;
    rating: number;
    posterImage: string;
    lengthMinutes: number;
    description: string;
  };
}>();

const fullPoster = computed(() => {
  const base = imageBase.replace(/\/$/, "");
  const path = props.movie.posterImage.replace(/^\//, "");
  return `${base}/${path}`;
});

function handleClick() {
  store.setLast(props.movie);
}
</script>
